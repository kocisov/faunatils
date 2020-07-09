import { Client, query as fauna, Expr } from 'faunadb';
import { CallerReturnType } from 'types';

export function faunatils(secret: string) {
  const client = new Client({ secret });

  return {
    client,
    async collections() {
      return await client
        .paginate(fauna.Collections())
        .map((ref) => fauna.Get(ref));
    },
    async run<T>(expression: Expr): Promise<CallerReturnType<T>> {
      let [error, response]: CallerReturnType<T> = [null, null];
      try {
        response = await client.query<T>(expression);
      } catch (err) {
        error = err;
      }
      return [error, response];
    },
  };
}
