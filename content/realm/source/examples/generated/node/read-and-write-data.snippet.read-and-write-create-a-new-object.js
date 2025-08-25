// Declare the variable that will hold the dog instance.
let dog;
// Open a transaction.
realm.write(() => {
  // Assign a newly-created instance to the variable.
  dog = realm.create("Dog", { name: "Max", age: 5 });
});
// use newly created dog object
