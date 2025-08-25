// You can define a listener for any collection of Realm objects
const dogs = realm.objects("Dog");
// Define a listener callback function for changes to any Dog
function onDogsChange(dogs, changes) {
  // Handle deleted Dog objects
  changes.deletions.forEach((index) => {
    // You cannot directly access deleted objects,
    // but you can update a UI list, etc. based on the index.
    console.log(`Looks like Dog #${index} has left the realm.`);
  });

  // Handle newly added Dog objects
  changes.insertions.forEach((index) => {
    const insertedDog = dogs[index];
    console.log(`Welcome our new friend, ${insertedDog.name}!`);
  });
  // Handle Dog objects that were modified
  changes.modifications.forEach((index) => {
    const modifiedDog = dogs[index];
    console.log(`Hey ${modifiedDog.name}, you look different!`);
  });
}
// Add the listener callback to the collection of dogs
try {
  dogs.addListener(onDogsChange);
} catch (error) {
  console.error(
    `An exception was thrown within the change listener: ${error}`
  );
}
// Remember to remove the listener when you're done!
dogs.removeListener(onDogsChange);
