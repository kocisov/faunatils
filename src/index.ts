import { Client, Expr, query as fQL } from 'faunadb';
import { WithRef, CallerReturnType, KeyFromSecret } from './types';

export async function createClient(secret: string) {
  const raw = new Client({ secret });
  const call = createCaller(raw);
  let keyInfo;

  const [err, response] = await call<KeyFromSecret>(fQL.KeyFromSecret(secret));

  if (err) {
    keyInfo = err.name;
  } else {
    keyInfo = response;
  }

  return {
    raw,
    keyInfo,
    call,
  };
}

export function createCaller(client: Client) {
  return async function call<T>(
    expression: Expr
  ): Promise<CallerReturnType<T>> {
    let [error, response]: CallerReturnType<T> = [null, null];
    try {
      response = await client.query<T>(expression);
    } catch (err) {
      error = err;
    }
    return [error, response];
  };
}

export function getIdFromRef(item: any) {
  return item.ref?.value?.id ?? item.ref['@ref']?.id;
}

export function payloadWithId<T>(item: WithRef<T>) {
  return {
    id: getIdFromRef(item),
    ...item.data,
  };
}

export { fQL };
export * from './collection';
export * from './indexes';
export * from './types';
export * from './user';
