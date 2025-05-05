export function replaceStringAndLinebreaks({
  haystack,
  stringBefore,
  stringAfter,
}: {
  haystack: string;
  stringBefore: string;
  stringAfter: string;
}) {
  const regex = stringBefore.split('').join('\\s?');
  return haystack.replace(new RegExp(regex, 'g'), stringAfter);
}

export function removeLinesBreaksInConflictingFiles(str: string) {
  return str.replace(
    /(Conflicting files:[\s\S]*?)(\n\nPress ENTER when the conflicts are resolved and files are staged)/g,
    (match, start, end) => {
      return start.replace(/\n/g, '') + end;
    },
  );
}
