export type RefID = string | number;

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

export type CallerReturnType<T> = [Error | null, T | null];

export type IndexTermOrValue = {
  field: string[];
};

export type CreateIndexOptions = {
  name: string;
  collection: string;
  terms?: IndexTermOrValue[];
  values?: IndexTermOrValue[];
  unique: boolean;
};

export type FaunaRef = {
  value: {
    collection: Collection;
    id: RefID;
    ts: number;
  };
};

export type WithRef<T> = {
  data: T;
  ref: FaunaRef;
  ts: number;
};
