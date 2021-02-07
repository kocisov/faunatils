import {query} from "faunadb";
import {RefID} from "./types";

export function refInCollection(ref: RefID, collection: string) {
  return query.Ref(query.Collection(collection), ref);
}

export function createCollection(name: string) {
  return query.CreateCollection({name});
}

export function createInCollection<T>(collection: string, data: T) {
  return query.Create(query.Collection(collection), {
    data,
  });
}

export function getAllInCollection(collection: string) {
  return query.Map(
    query.Paginate(query.Documents(query.Collection(collection))),
    query.Lambda("ref", query.Get(query.Var("ref"))),
  );
}

export function getInCollectionByRef(collection: string, ref: RefID) {
  return query.Get(refInCollection(ref, collection));
}

export function deleteInCollectionByRef(collection: string, ref: RefID) {
  return query.Delete(refInCollection(ref, collection));
}

export function deleteAllInCollection(collection: string) {
  return query.Map(
    query.Paginate(query.Documents(query.Collection(collection)), {
      size: 99999,
    }),
    query.Lambda(["ref"], query.Delete(query.Var("ref"))),
  );
}

export function updateInCollectionByRef<T>(
  collection: string,
  ref: RefID,
  data: T,
) {
  return query.Update(refInCollection(ref, collection), {
    data,
  });
}

export function replaceInCollectionByRef<T>(
  collection: string,
  ref: RefID,
  data: T,
) {
  return query.Replace(refInCollection(ref, collection), {
    data,
  });
}

export function updateAllInCollection<T>(collection: string, data: T) {
  return query.Map(
    query.Paginate(query.Documents(query.Collection(collection))),
    query.Lambda(
      "ref",
      query.Update(query.Var("ref"), {
        data,
      }),
    ),
  );
}
