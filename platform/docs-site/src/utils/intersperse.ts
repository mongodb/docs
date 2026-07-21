type InterspersedItem<T> = T | string;
type InterspersedArray<T> = Array<InterspersedItem<T>>;

/** Return an array with the separator interspersed between each element of the input array. */
export const intersperse = <Type>(
  arr: InterspersedArray<Type>,
  sep: InterspersedItem<Type> = ', ',
): InterspersedArray<Type> => {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce((xs, x) => xs.concat([sep, x]), [arr[0]]);
};
