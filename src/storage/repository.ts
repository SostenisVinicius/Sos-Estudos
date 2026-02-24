import type { BackupPayload, Settings } from '../domain/types';
import { backupSchema } from '../domain/types';
import { dbPromise, hasIndexedDB, SCHEMA_VERSION } from './db';

type Store = 'settings' | 'dailyLogs' | 'errorNotes' | 'essays' | 'mockExams' | 'weekPlans';

const LS_KEY = 'bb-study-tracker-fallback';

const localRead = (): Record<string, unknown[]> => {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? (JSON.parse(raw) as Record<string, unknown[]>) : {};
};
const localWrite = (data: Record<string, unknown[]>) => localStorage.setItem(LS_KEY, JSON.stringify(data));

export const repository = {
  async getAll<T>(store: Store): Promise<T[]> {
    if (hasIndexedDB()) return ((await dbPromise).getAll(store)) as Promise<T[]>;
    const data = localRead();
    return (data[store] ?? []) as T[];
  },
  async save<T extends { id: string }>(store: Store, value: T) {
    if (hasIndexedDB()) return (await dbPromise).put(store, value);
    const data = localRead();
    const list = (data[store] ?? []) as T[];
    const idx = list.findIndex((i) => i.id === value.id);
    if (idx >= 0) list[idx] = value;
    else list.push(value);
    data[store] = list;
    localWrite(data);
  },
  async remove(store: Store, id: string) {
    if (hasIndexedDB()) return (await dbPromise).delete(store, id);
    const data = localRead();
    data[store] = ((data[store] ?? []) as { id: string }[]).filter((i) => i.id !== id);
    localWrite(data);
  },
  async exportAll(settings: Settings): Promise<BackupPayload> {
    return {
      schemaVersion: SCHEMA_VERSION,
      settings,
      dailyLogs: await this.getAll('dailyLogs'),
      errorNotes: await this.getAll('errorNotes'),
      essays: await this.getAll('essays'),
      mockExams: await this.getAll('mockExams'),
      weekPlans: await this.getAll('weekPlans'),
    };
  },
  async importAll(payload: unknown, mode: 'replace' | 'merge') {
    const data = backupSchema.parse(payload);
    const stores: Store[] = ['dailyLogs', 'errorNotes', 'essays', 'mockExams', 'weekPlans'];
    if (mode === 'replace') {
      if (hasIndexedDB()) {
        const db = await dbPromise;
        for (const s of stores) {
          const tx = db.transaction(s, 'readwrite');
          await tx.store.clear();
          for (const item of data[s]) await tx.store.put(item as never);
          await tx.done;
        }
      } else {
        localStorage.removeItem(LS_KEY);
        const obj: Record<string, unknown[]> = {};
        for (const s of stores) obj[s] = data[s];
        localWrite(obj);
      }
      return data;
    }

    for (const s of stores) {
      for (const item of data[s]) {
        await this.save(s, item as { id: string });
      }
    }
    return data;
  },
};
