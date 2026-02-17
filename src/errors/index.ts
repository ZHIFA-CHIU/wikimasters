import { Data } from "effect";
export const errorStringify = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (error === null) return "null";
  if (error === undefined) return "undefined";

  if (typeof error === "object") {
    const maybeMessage = (error as { message?: unknown }).message;
    if (typeof maybeMessage === "string") return maybeMessage;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
};

export class ServerActionDomainError extends Data.TaggedError(
  "ServerActionDomaiError",
)<{
  errorMessage: string;
}> {}

export class UserNotFoundError extends Data.TaggedError("UserNotFoundError") {}
