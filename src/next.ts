import { Client, query as fauna, Expr } from 'faunadb';
import { CallerReturnType, WithRef, RefID } from './types';

export function faunatils(secret: string) {
  const client = new Client({ secret });

  async function collections() {
    return await client
      .paginate(fauna.Collections())
      .map((ref) => fauna.Get(ref));
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
    document,
    documents,
    run,
    update,
    updateAll,
  };
}
