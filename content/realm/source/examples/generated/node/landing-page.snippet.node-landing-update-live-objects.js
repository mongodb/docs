// find a cat named "Clover"
const cloverCat = cats.filtered("name == 'Clover'")[0];
// update the Cat in a write transaction
realm.write(() => {
  // update clover's age to 5 years old
  cloverCat.age = 5;
}); // when the transaction completes, the cat's age is updated in the database
console.log(`Clover the cat is ${cloverCat.age} years old`);
