import { Client, Expr, ExprArg, query as fauna } from 'faunadb';

export type RefID = string | number;

type Ref = {
  value: {
    id: RefID;
    collection: string;
    ts: number;
  };
};

export type WithRef<T> = {
  ref: Ref;
  data: T;
};

export function createClient(secret: string) {
  return new Client({ secret });
}

export function getIdFromRef<T>(item: WithRef<T>) {
  return item.ref.value.id;
}

export function payloadWithId<T>(item: WithRef<T>) {
  return {
    id: getIdFromRef(item),
    ...item.data,
  };
}

export function updateAllInCollection(collection: string, data: any) {
  return fauna.Map(fauna.Collection(collection), (ref) =>
    fauna.Update(fauna.Get(ref), {
      data,
    })
  );
}

export function getByIndex(index: string, ...terms: ExprArg[]) {
  return fauna.Get(fauna.Match(fauna.Index(index), ...terms));
}

export function getAllByIndex(index: string) {
  return fauna.Map(fauna.Paginate(fauna.Match(fauna.Index(index))), (ref) =>
    fauna.Get(ref)
  );
}

export function refInCollection(ref: RefID, collection: string) {
  return fauna.Ref(fauna.Collection(collection), ref);
}

export function createInCollection(collection: string, data: any) {
  return fauna.Create(fauna.Collection(collection), {
    data,
  });
}

export function getInCollectionByRef(collection: string, ref: RefID) {
  return fauna.Get(refInCollection(ref, collection));
}

export function deleteInCollectionByRef(collection: string, ref: RefID) {
  return fauna.Delete(refInCollection(ref, collection));
}

export function updateInCollectionByRef(
  collection: string,
  ref: RefID,
  data: any
) {
  return fauna.Update(refInCollection(ref, collection), {
    data,
  });
}

export function replaceInCollectionByRef(
  collection: string,
  ref: RefID,
  data: any
) {
  return fauna.Replace(refInCollection(ref, collection), {
    data,
  });
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

export { fauna as f };
export * from './user';
