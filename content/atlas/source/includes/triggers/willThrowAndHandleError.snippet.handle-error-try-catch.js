function willThrowAndHandleError() {
  try {
    throw new Error("This will always happen");
  } catch (err) {
    console.error("An error occurred. Error message:" + err.message);
  }
}

exports = willThrowAndHandleError;
