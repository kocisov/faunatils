import {query} from "faunadb";

export function createUserInCollection<T>(
  collection: string,
  password: string,
  data: T,
) {
  return query.Create(query.Collection(collection), {
    credentials: {
      password,
    },
    data,
  });
}

export function loginUserInIndex(
  index: string,
  value: string | number,
  password: string,
) {
  return query.Login(query.Match(query.Index(index), value), {
    password,
  });
}

export function updatePasswordInIndex(
  index: string,
  value: string | number,
  password: string,
) {
  return query.Update(query.Match(query.Index(index), value), {
    credentials: {
      password,
    },
  });
}

export function updateUserInIndex(
  index: string,
  value: string | number,
  data: any,
) {
  return query.Update(query.Match(query.Index(index), value), {
    data,
  });
}

export function logoutUser(deleteTokens = false) {
  return query.Logout(deleteTokens);
}
