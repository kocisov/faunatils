import { query as fauna, ExprArg } from 'faunadb';
import { IndexTermOrValue } from 'types';

export function getByIndex(index: string, ...terms: ExprArg[]) {
  return fauna.Get(fauna.Match(fauna.Index(index), ...terms));
}

export function getAllByIndex(index: string, ...terms: ExprArg[]) {
  return fauna.Map(
    fauna.Paginate(fauna.Match(fauna.Index(index), ...terms)),
    fauna.Lambda('ref', fauna.Get(fauna.Var('ref')))
  );
}

export function createIndex(
  name: string,
  collection: string,
  terms?: IndexTermOrValue[],
  values?: IndexTermOrValue[],
  unique: boolean = false
) {
  return fauna.CreateIndex({
    name,
    source: fauna.Collection(collection),
    terms,
    values,
    unique,
  });
}
