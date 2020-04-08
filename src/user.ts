import { query as fauna } from 'faunadb';

export function createUserInCollection(
  collection: string,
  password: string,
  data: any
) {
  return fauna.Create(fauna.Collection(collection), {
    credentials: {
      password,
    },
    data,
  });
}

export function loginUserInIndex(
  index: string,
  value: string | number,
  password: string
) {
  return fauna.Login(fauna.Match(fauna.Index(index), value), {
    password,
  });
}

export function updatePasswordInIndex(
  index: string,
  value: string | number,
  password: string
) {
  return fauna.Update(fauna.Match(fauna.Index(index), value), {
    credentials: {
      password,
    },
  });
}

export function updateUserInIndex(
  index: string,
  value: string | number,
  data: any
) {
  return fauna.Update(fauna.Match(fauna.Index(index), value), {
    data,
  });
}

export function logoutUser() {
  return fauna.Logout(false);
}
