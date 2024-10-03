async function retryOperation({ fullDocument: logEntry }) {
  // parse values from log entry posted to database
  const { args, retries, functionName, operationId } = logEntry;
  // Re-execute the main function
  await context.functions.execute(functionName, ...args, operationId, retries);
}

exports = retryOperation;
