import { Client, query as fauna, Expr } from 'faunadb';
import { CallerReturnType, WithRef, RefID, Database } from './types';

export function faunatils(secret: string) {
  const client = new Client({ secret });

  async function collections(
    database?: Database | undefined,
    raw: boolean = false
  ) {
    const { data } = await client.query(
      fauna.Paginate(fauna.Collections(database ?? undefined))
    );
    if (raw) {
      return data;
    }
    return data.map((collection: any) => collection.value.id);
  }

  async function database(db: Database | string) {
    return await client.query(
      fauna.Get(fauna.Database(typeof db === 'string' ? db : db.value.id))
    );
  }

  async function databases(raw: boolean = true) {
    const { data } = await client.query(fauna.Paginate(fauna.Databases()));
    if (raw) {
      return data;
    }
    return data.map((database: Database) => database.value.id);
  }

  async function document<T = {}>(collection: string, refId: RefID) {
    return await run<WithRef<T>>(
      fauna.Get(fauna.Ref(fauna.Collection(collection), refId))
    );
  }

  async function documents<T = []>(collection: string) {
    return await run<WithRef<T>>(
      fauna.Map(
        fauna.Paginate(fauna.Documents(fauna.Collection(collection))),
        fauna.Lambda((ref) => fauna.Get(ref))
      )
    );
  }

  async function run<T>(expression: Expr): Promise<CallerReturnType<T>> {
    let [error, response]: CallerReturnType<T> = [null, null];
    try {
      response = await client.query<T>(expression);
    } catch (err) {
      error = err;
    }
    return [error, response];
  }

  async function update<T = {}, V = {}>(
    collection: string,
    refId: RefID,
    data: V
  ) {
    return await run<T>(
      fauna.Update(fauna.Ref(fauna.Collection(collection), refId), {
        data,
      })
    );
  }

  async function updateAll<T = {}, V = {}>(collection: string, data: V) {
    return await run<T>(
      fauna.Map(
        fauna.Paginate(fauna.Documents(fauna.Collection(collection))),
        fauna.Lambda(
          'ref',
          fauna.Update(fauna.Var('ref'), {
            data,
          })
        )
      )
    );
  }

  return {
    client,
    collections,
    database,
    databases,
    document,
    documents,
    run,
    update,
    updateAll,
  };
}
