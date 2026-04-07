import type { NetlifyPluginUtils } from '@netlify/build';
export const displayParserLogs = async ({
  parserLogs,
  status,
  numVersionsParsed,
}: {
  parserLogs: string;
  status: NetlifyPluginUtils['status'];
  numVersionsParsed: number;
}) => {
  const logsSplit = parserLogs.split('\n');
  const filteredLogs =
    logsSplit.filter(
      (row) =>
        row?.length &&
        !row.includes('INFO:snooty.main:Snooty') &&
        !row.includes('INFO:snooty.gizaparser.domain') &&
        !row.includes('INFO:snooty.parser:cache'),
    ) || [];

  let errorCount = 0;
  let warningCount = 0;

  for (const row of filteredLogs) {
    if (row.includes('ERROR')) errorCount += 1;
    if (row.includes('WARNING')) warningCount += 1;
  }

  status.show({
    title: `PARSER LOGS: (${numVersionsParsed} versions parsed)     (Errors: ${errorCount} | Warnings: ${warningCount})`,
    summary:
      filteredLogs.length && filteredLogs[0]
        ? filteredLogs.join('\n')
        : 'No content parsed',
  });
};

export const constructParserLogs = (
  returnedPromises: PromiseSettledResult<string>[],
): string => {
  return returnedPromises.reduce(
    (accumulator: string, currentVal: PromiseSettledResult<string>) => {
      if (currentVal.status !== 'rejected') {
        return `${accumulator}\n - ${currentVal.value}\n`;
      }
      return `${accumulator}\n - ${currentVal.reason}\n`;
    },
    '',
  );
};
