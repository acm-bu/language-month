
export type ActionError = {
  message: string;
  cause: "server" | "client";
}

export type OkResponse<T> = { result: "OK", data: T, error: null } ;
export type FailedResponse = { result: "ERR", data: null, error: ActionError };

export type ActionResponse<T = undefined> = Promise<OkResponse<T> | FailedResponse>;

export function ok<T>(v: T): OkResponse<T> {
  return {
    result: "OK",
    data: v,
    error: null,
  }
}

export function serverErr(msg: string): FailedResponse {
  return {
    result: "ERR",
    data: null,
    error: {
      message: msg,
      cause: "server"
    }
  }
}

export function clientErr(msg: string): FailedResponse {
  return {
    result: "ERR",
    data: null,
    error: {
      message: msg,
      cause: "server"
    }
  }
}
