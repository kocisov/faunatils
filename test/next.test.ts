import { faunatils } from '../src/next';

const faunatil = faunatils(process.env.FAUINA_KEY!);

describe('faunatils@next', () => {
  it('gets all databases', async () => {
    const databases = await faunatil.databases(false);
    expect(Array.isArray(databases)).toBe(true);
  });

  it('gets database by name', async () => {
    const database: any = await faunatil.database('fauina');
    expect(database.name).toBe('fauina');
    expect(database.global_id).toBe('yqxrzhkekybyr');
  });

  it('gets all collections in database', async () => {
    const databases = await faunatil.collections(undefined);
    expect(Array.isArray(databases)).toBe(true);
  });
});
