"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { errorsAtom, addErrorAtom, removeErrorAtom, ErrorItem } from "@/client/state";

function ErrorToast({ error }: { error: ErrorItem }) {
  const [, removeError] = useAtom(removeErrorAtom);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeError(error.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error.id, removeError]);

  return (
    <div className="alert alert-error shadow-lg mb-2 animate-fade-in">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm">{error.message}</span>
          <div className="flex items-center gap-2">
            {error.count > 1 && (
              <div className="badge badge-neutral">{error.count}</div>
            )}
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => removeError(error.id)}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ErrorToasts() {
  const [errors] = useAtom(errorsAtom);
  const [, addError] = useAtom(addErrorAtom);

  useEffect(() => {
    const handlePushError = (event: CustomEvent<{ message: string }>) => {
      addError(event.detail.message);
    };

    window.addEventListener("pushError", handlePushError as EventListener);
    return () => {
      window.removeEventListener("pushError", handlePushError as EventListener);
    };
  }, [addError]);

  if (errors.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-sm">
      {errors.map((error) => (
        <ErrorToast key={error.id} error={error} />
      ))}
    </div>
  );
}