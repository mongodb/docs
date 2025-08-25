// :snippet-start: retry-operation-db-trigger-function
async function retryOperation({ fullDocument: logEntry }) {
  // parse values from the log entry posted to database
  const { args, retries, functionName, operationId } = logEntry;
  // Re-execute the main function
  await context.functions.execute(functionName, ...args, operationId, retries);
}

exports = retryOperation;
// :snippet-end:
