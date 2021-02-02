import {query} from "faunadb";

export const createUserInCollection = <T>(
  collection: string,
  password: string,
  data: T,
) =>
  query.Create(query.Collection(collection), {
    credentials: {
      password,
    },
    data,
  });

export const loginUserInIndex = (
  index: string,
  value: string | number,
  password: string,
) =>
  query.Login(query.Match(query.Index(index), value), {
    password,
  });

export const updatePasswordInIndex = (
  index: string,
  value: string | number,
  password: string,
) =>
  query.Update(query.Match(query.Index(index), value), {
    credentials: {
      password,
    },
  });

export const updateUserInIndex = (
  index: string,
  value: string | number,
  data: any,
) =>
  query.Update(query.Match(query.Index(index), value), {
    data,
  });

export const logoutUser = (deleteTokens = false) => query.Logout(deleteTokens);
