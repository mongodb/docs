// :snippet-start: addition-with-retry-handler
// randomly generates 1, 2, or 3
function getRandomOneTwoThree() {
  return Math.floor(Math.random() * 3) + 1;
}

function additionOrFailure(num1, num2) {
  // Throw an error if getRandomOneTwoThree returns 1
  const rand = getRandomOneTwoThree();
  if (rand === 1) throw new Error("Uh oh!!");
  const sum = num1 + num2;
  console.log(`Successful addition of ${num1} + ${num2}. Result: ${sum}`);

  // Otherwise return the sum
  return sum;
}

async function additionWithRetryHandler(
  inputVar1,
  inputVar2,
  // create a new `operation_id` if one is not provided
  operationId = new BSON.ObjectId(),
  // count number of attempts
  retries = 0
) {
  const res = await context.functions.execute(
    "handleRetry",
    additionOrFailure,
    "additionWithRetryHandler", // MUST BE NAME OF FUNCTION
    operationId,
    retries,
    inputVar1,
    inputVar2
  );
  return res;
}

exports = additionWithRetryHandler;
// :snippet-end:
