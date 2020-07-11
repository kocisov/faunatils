export type RefID = string | number;

export type FaunaRef = {
  value: {
    collection: string;
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
};

export type CallerReturnType<T> = [Error | null, T | null];

export type Database = {
  value: {
    id: string;
    collection: any;
  };
};
