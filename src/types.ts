export type RefID = string | number;

export type FaunaRef = {
  value: {
    id: RefID;
    collection: string;
    ts: number;
  };
};

export type IndexTermOrValue = {
  field: string[];
};

export type WithRef<T> = {
  ref: FaunaRef;
  data: T;
};
