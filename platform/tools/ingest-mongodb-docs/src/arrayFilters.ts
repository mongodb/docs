/**
  Given an array of PromiseSettledResults, return those that are fulfilled as PromiseFulfilledResults.
 */
export const filterFulfilled = <T>(
  array: PromiseSettledResult<T>[]
): PromiseFulfilledResult<T>[] =>
  array.filter(
    ({ status }) => status === "fulfilled"
  ) as PromiseFulfilledResult<T>[];

/**
  Given an array of possibly undefined T, return those that are defined.
 */
export const filterDefined = <T>(array: T[]): Exclude<T, undefined>[] =>
  array.filter((value) => value !== undefined) as Exclude<T, undefined>[];
