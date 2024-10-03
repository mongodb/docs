// Utility function to suspend execution of current process
async function sleep(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Set variables to be used by all calls to `mightFail`
// Tip: You could also store `MAX_RETRIES` and `THROTTLE_TIME_MS`
// in App Services Values
const MAX_RETRIES = 5;
const THROTTLE_TIME_MS = 5000;
let currentRetries = 0;
let errorMessage = "";


async function mightFail(...inputVars) {
  if (currentRetries === MAX_RETRIES) {
    console.error(
      `Reached maximum number of retries (${MAX_RETRIES}) without successful execution.`
    );
    console.error("Error Message:", errorMessage);
    return;
  }
  let res;
  try {
    // operation that might fail
    res = await callFlakyExternalService(...inputVars);
  } catch (err) {
    errorMessage = err.message;
    // throttle retries
    await sleep(THROTTLE_TIME_MS);
    currentRetries++;
    res = await mightFail(...inputVars);
  }
  return res;
}

exports = mightFail;
