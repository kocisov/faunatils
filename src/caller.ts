import {Client, Expr} from "faunadb";
import {CallerReturnType} from "./types";

export function createCaller(client: Client) {
  return async function call<T>(
    expression: Expr,
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
