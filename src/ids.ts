import {WithRef} from "./types";

export function getIdFromResponse<T>(response: WithRef<T>) {
  return response?.ref?.value?.id ?? null;
}

export function getIdFromBlock(item: any) {
  return item.ref?.value?.id ?? item.ref?.["@ref"]?.id ?? null;
}
