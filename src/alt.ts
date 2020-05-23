import { Client, query as fauna, Expr } from 'faunadb';

export function createAltClient(secret: string) {
  const client = new Client({ secret });

  return {
    client,
    async getCollections() {
      return await client
        .paginate(fauna.Collections())
        .map((ref) => fauna.Get(ref));
    },
    async run(expression: Expr) {
      return await client.paginate(expression);
    },
  };
}
