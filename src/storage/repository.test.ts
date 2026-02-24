import { describe, expect, it } from 'vitest';
import { defaultSettings } from '../data/defaults';
import { repository } from './repository';

describe('backup schema', () => {
  it('exports with schema version', async () => {
    const data = await repository.exportAll(defaultSettings);
    expect(data.schemaVersion).toBe(1);
  });
});
