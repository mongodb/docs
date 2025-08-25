
// Define a listener callback function for changes to a specific Dog
function onDogChange(dog, changes) {
  if (changes.deleted) {
    console.log(`dog is deleted: ${changes.deleted}`);
  } else {
    changes.changedProperties.forEach((prop) => {
      console.log(`* the value of "${prop}" changed to ${dog[prop]}`);
    });
  }
}
// You can define a listener for any Realm object
try {
  dog.addListener(onDogChange);
} catch (error) {
  console.error(
    `An exception was thrown within the change listener: ${error}`
  );
}
// Remember to remove the listeners when you're done!
dog.removeListener(onDogChange);
