// :snippet-start: handle-retry

// Tip: You could also put this in an App Services Value
const MAX_FUNC_RETRIES = 5;

async function handleRetry(
  functionToRetry,
  functionName,
  operationId,
  previousRetries,
  ...args
) {
  try {
    // Try to execute the main function
    const response = await functionToRetry(...args);
    return response;
  } catch (err) {
    // Evaluates if it should retry the function again.
    // If not, it throws an error and stops retrying.
    if (previousRetries === MAX_FUNC_RETRIES) {
      throw new Error(
        `Maximum number of attempts reached (${MAX_FUNC_RETRIES}) for function '${functionName}': ${err.message}`
      );
    }

    // Build function execution log entry for insertion into database.
    const logEntry = {
      operationId,
      errorMessage: err.message,
      timestamp: new Date(),
      retries: previousRetries + 1,
      args,
      functionName,
    };

    // Get reference to database collection
    const executionLog = context.services
      .get("mongodb-atlas")
      .db("logs")
      .collection("failed_execution_logs");

    // Add execution log entry to database
    await executionLog.insertOne(logEntry);
    return;
  }
}

exports = handleRetry;
// :snippet-end:
