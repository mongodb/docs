export function isErrnoError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error;
}
