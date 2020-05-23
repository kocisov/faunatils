import { query as fauna } from 'faunadb';
import { RefID } from './types';

export function refInCollection(ref: RefID, collection: string) {
  return fauna.Ref(fauna.Collection(collection), ref);
}

export function createCollection(name: string) {
  return fauna.CreateCollection({ name });
}

export function createInCollection(collection: string, data: any) {
  return fauna.Create(fauna.Collection(collection), {
    data,
  });
}

export function getAllInCollection(collection: string) {
  return fauna.Map(
    fauna.Paginate(fauna.Documents(fauna.Collection(collection))),
    fauna.Lambda('ref', fauna.Get(fauna.Var('ref')))
  );
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

export function updateAllInCollection(collection: string, data: any) {
  return fauna.Map(
    fauna.Paginate(fauna.Documents(fauna.Collection(collection))),
    fauna.Lambda(
      'ref',
      fauna.Update(fauna.Var('ref'), {
        data,
      })
    )
  );
}
