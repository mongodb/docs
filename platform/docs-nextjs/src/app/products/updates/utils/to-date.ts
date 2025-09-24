export const normalizeDate = (date: string) => {
  // Check if the date string has the correct format 'YYYY-MM-DD'
  const dateToNormalize = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)?.slice(1); // excludes the full date in the first index i.e. "2025-05-27"
  if (dateToNormalize) {
    // This is needed because, JavaScript’s Date constructor uses zero-based months (January = 0 … December = 11).
    return new Date(Number(dateToNormalize[0]), Number(dateToNormalize[1]) - 1, Number(dateToNormalize[2]));
  }
  return new Date(date);
};
