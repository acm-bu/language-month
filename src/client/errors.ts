import { FailedResponse } from "@/actions";

export const pushError = (message: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("pushError", { detail: { message } }));
  }
};

export const pushErrorFromResponse = async (response: Response) => {
  try {
    const errorData = await response.json();
    pushError(errorData.message || errorData.error || "An unexpected error occurred");
  } catch {
    pushError(`Error: ${response.status} ${response.statusText}`);
  }
};

export const pushActionErr = async (res: FailedResponse) => {
  pushError(`${res.error.cause} error: ${res.error.message}`);
}

export const pushErrorFromException = (error: unknown) => {
  if (error instanceof Error) {
    pushError(error.message);
  } else {
    pushError("An unexpected error occurred");
  }
};
