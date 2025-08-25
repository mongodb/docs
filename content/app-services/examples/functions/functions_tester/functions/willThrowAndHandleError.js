// :snippet-start: handle-error-try-catch
function willThrowAndHandleError() {
  try {
    throw new Error("This will always happen");
  } catch (err) {
    console.error("An error occurred. Error:" + err.message);
  }
}

exports = willThrowAndHandleError;
// :snippet-end:
