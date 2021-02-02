import {WithRef} from "./types";

export const getIdFromResponse = <T>(response: WithRef<T>) =>
  response.ref.value.id;

export const getIdFromBlock = (item: any) =>
  item.ref?.value?.id ?? item.ref["@ref"]?.id ?? "";
