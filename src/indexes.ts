import {ExprArg, query} from "faunadb";
import {CreateIndexOptions} from "./types";

export function getByIndex(index: string, ...terms: ExprArg[]) {
  return query.Get(query.Match(query.Index(index, ...terms)));
}

export function getAllByIndex(index: string, ...terms: ExprArg[]) {
  return query.Map(
    query.Paginate(query.Match(query.Index(index), ...terms)),
    query.Lambda("ref", query.Get(query.Var("ref"))),
  );
}

export function createIndex(options: CreateIndexOptions) {
  return query.CreateIndex(options);
}
