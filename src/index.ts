import { Client, Expr, ExprArg, query as fauna } from 'faunadb';

export type RefID = string | number;

export type WithRef<T> = {
  ref: {
    value: {
      id: RefID;
      collection: string;
      ts: number;
    };
  };
  data: T;
};

export function getIdFromRef<T>(item: WithRef<T>) {
  return item.ref.value.id;
}

export function payloadWithId<T>(item: WithRef<T>) {
  return {
    id: getIdFromRef(item),
    ...item.data,
  };
}

export function getByIndex(index: string, ...terms: ExprArg[]) {
  return fauna.Get(fauna.Match(fauna.Index(index), ...terms));
}

export function getAllByIndex(index: string) {
  return fauna.Map(fauna.Paginate(fauna.Match(fauna.Index(index))), (ref) =>
    fauna.Get(ref)
  );
}

export function getInCollectionByRef(collection: string, ref: RefID) {
  return fauna.Get(fauna.Ref(fauna.Collection(collection), ref));
}

export function deleteInCollectionByRef(collection: string, ref: RefID) {
  return fauna.Delete(fauna.Ref(fauna.Collection(collection), ref));
}

export function createCaller(client: Client) {
  return async function call<T>(
    expression: Expr
  ): Promise<[Error | null, T | null]> {
    let [error, response]: [Error | null, T | null] = [null, null];
    try {
      response = await client.query<T>(expression);
    } catch (_error) {
      error = _error;
    }
    return [error, response];
  };
}

export function createClient(secret: string) {
  return new Client({ secret });
}
