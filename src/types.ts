import {Client, Expr} from "faunadb";

export type RefID = string | number;

export type FaunatilsClientObject = {
  raw: Client;
  keyInfo: KeyFromSecret | string | null;
  call<T>(expression: Expr): Promise<CallerReturnType<T>>;
};

export type Collection = {
  value: {
    id: string;
    collection: {
      value: {
        id: "collections";
      };
    };
    database: {
      id: string;
    };
  };
};

export type Database = {
  value: {
    id: string;
    collection: {
      value: {
        id: "databases";
      };
    };
    database?: {
      value: {
        id: string;
      };
    };
  };
};

export type ResponseFaunaRef = {
  "@ref": {
    id: RefID;
    collection: Collection;
    ts?: number;
  };
};

export type FaunaRef = {
  value: {
    collection: Collection;
    id: RefID;
    ts: number;
  };
};

export type IndexTermOrValue = {
  field: string[];
};

export type WithRef<T> = {
  data: T;
  ref: FaunaRef;
  ts: number;
};

export type Roles = "server" | "admin";

export type KeyFromSecret = {
  database?: Database;
  hashed_secret: string;
  ref: FaunaRef;
  role: Roles;
  ts: number;
};

export type CallerReturnType<T> = [Error | null, T | null];
