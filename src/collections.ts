import {query} from "faunadb";
import {RefID} from "./types";

export const refInCollection = (ref: RefID, collection: string) =>
  query.Ref(query.Collection(collection), ref);

export const createCollection = (name: string) =>
  query.CreateCollection({name});

export const createInCollection = <T>(collection: string, data: T) =>
  query.Create(query.Collection(collection), {
    data,
  });

export const getAllInCollection = (collection: string) =>
  query.Map(
    query.Paginate(query.Documents(query.Collection(collection))),
    query.Lambda("ref", query.Get(query.Var("ref"))),
  );

export const getInCollectionByRef = (collection: string, ref: RefID) =>
  query.Get(refInCollection(ref, collection));

export const deleteInCollectionByRef = (collection: string, ref: RefID) =>
  query.Delete(refInCollection(ref, collection));

export const updateInCollectionByRef = <T>(
  collection: string,
  ref: RefID,
  data: T,
) =>
  query.Update(refInCollection(ref, collection), {
    data,
  });

export const replaceInCollectionByRef = <T>(
  collection: string,
  ref: RefID,
  data: T,
) =>
  query.Replace(refInCollection(ref, collection), {
    data,
  });

export const updateAllInCollection = <T>(collection: string, data: T) =>
  query.Map(
    query.Paginate(query.Documents(query.Collection(collection))),
    query.Lambda(
      "ref",
      query.Update(query.Var("ref"), {
        data,
      }),
    ),
  );
