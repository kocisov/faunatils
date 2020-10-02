import {query as fauna} from "faunadb";
import {RefID} from "./types";

export function refInCollection(ref: RefID, collection: string) {
  return fauna.Ref(fauna.Collection(collection), ref);
}

export function createCollection(name: string) {
  return fauna.CreateCollection({name});
}

export function createInCollection<T>(collection: string, data: T) {
  return fauna.Create(fauna.Collection(collection), {
    data,
  });
}

export function getAllInCollection(collection: string) {
  return fauna.Map(
    fauna.Paginate(fauna.Documents(fauna.Collection(collection))),
    fauna.Lambda("ref", fauna.Get(fauna.Var("ref")))
  );
}

export function getInCollectionByRef(collection: string, ref: RefID) {
  return fauna.Get(refInCollection(ref, collection));
}

export function deleteInCollectionByRef(collection: string, ref: RefID) {
  return fauna.Delete(refInCollection(ref, collection));
}

export function updateInCollectionByRef<T>(
  collection: string,
  ref: RefID,
  data: T
) {
  return fauna.Update(refInCollection(ref, collection), {
    data,
  });
}

export function replaceInCollectionByRef<T>(
  collection: string,
  ref: RefID,
  data: T
) {
  return fauna.Replace(refInCollection(ref, collection), {
    data,
  });
}

export function updateAllInCollection<T>(collection: string, data: T) {
  return fauna.Map(
    fauna.Paginate(fauna.Documents(fauna.Collection(collection))),
    fauna.Lambda(
      "ref",
      fauna.Update(fauna.Var("ref"), {
        data,
      })
    )
  );
}
