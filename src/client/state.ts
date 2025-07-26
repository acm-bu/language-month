"use client";

import { atom } from "jotai";

export interface ErrorItem {
  id: string;
  message: string;
  count: number;
  timestamp: number;
}

export const errorsAtom = atom<ErrorItem[]>([]);

export const addErrorAtom = atom(
  null,
  (get, set, message: string) => {
    const currentErrors = get(errorsAtom);
    const existingError = currentErrors.find(error => error.message === message);
    
    if (existingError) {
      // Update existing error count
      set(errorsAtom, currentErrors.map(error => 
        error.id === existingError.id 
          ? { ...error, count: error.count + 1, timestamp: Date.now() }
          : error
      ));
    } else {
      // Add new error, keep only 5 most recent
      const newError: ErrorItem = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        message,
        count: 1,
        timestamp: Date.now()
      };
      
      const updatedErrors = [newError, ...currentErrors].slice(0, 5);
      set(errorsAtom, updatedErrors);
    }
  }
);

export const removeErrorAtom = atom(
  null,
  (get, set, errorId: string) => {
    const currentErrors = get(errorsAtom);
    set(errorsAtom, currentErrors.filter(error => error.id !== errorId));
  }
);

// Global function to push errors from anywhere
export const pushError = (message: string) => {
  // This will be called from components that have access to jotai store
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("pushError", { detail: { message } }));
  }
};
