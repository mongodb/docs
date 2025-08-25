// wrap the code below in an async function to 'await' for the promises to resolve
const numA = 2;
const numB = 3;
const result = await user.functions.sum(numA, numB);
const resultOfCallFunction = await user.callFunction("sum", numA, numB); // alternate syntax to call a MongoDB Realm Function
console.log(
  `Using the "functions.sum()" method: the sum of ${numA} + ${numB} = ${result}`
);
console.log(
  `Using the "callFunction()" method: the sum of ${numA} + ${numB} = ${resultOfCallFunction}`
);
