import {ExprArg, query} from "faunadb";
import {CreateIndexOptions} from "./types";

export const getByIndex = (index: string, ...terms: ExprArg[]) =>
  query.Get(query.Match(query.Index(index, ...terms)));

export const getAllByIndex = (index: string, ...terms: ExprArg[]) =>
  query.Map(
    query.Paginate(query.Match(query.Index(index), ...terms)),
    query.Lambda("ref", query.Get(query.Var("ref"))),
  );

export const createIndex = (options: CreateIndexOptions) =>
  query.CreateIndex(options);
