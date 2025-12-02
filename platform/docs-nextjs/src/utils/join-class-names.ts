// Returns a string of joined class names. Only defined class names are included in the string
// We return undefined if there are no classes to avoid returning an empty string
export const joinClassNames = (...args: (string | undefined)[]) =>
  args.filter((className) => !!className).join(' ') || undefined;
