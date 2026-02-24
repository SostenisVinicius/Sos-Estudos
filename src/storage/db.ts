import { openDB } from 'idb';

export const SCHEMA_VERSION = 1;

export const dbPromise = openDB('bb-study-tracker', SCHEMA_VERSION, {
  upgrade(db) {
    for (const store of ['settings', 'dailyLogs', 'errorNotes', 'essays', 'mockExams', 'weekPlans']) {
      if (!db.objectStoreNames.contains(store)) db.createObjectStore(store, { keyPath: 'id' });
    }
  },
});

export const hasIndexedDB = () => typeof window !== 'undefined' && 'indexedDB' in window;
