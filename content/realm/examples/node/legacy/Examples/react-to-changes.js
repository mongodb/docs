import Realm from "realm";

const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    age: "int?",
  },
};

describe("React to Changes", () => {
  test("should register a change listener on the realm", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm",
      schema: [DogSchema],
    });
    let dog;
    let hasRealmChanged = false; // boolean value to test if a change has registered

    // :snippet-start: react-to-changes-register-change-listener
    // Define a listener callback function
    function onRealmChange() {
      console.log("Something changed!");
      // :remove-start:
      hasRealmChanged = true;
      // :remove-end:
    }
    // Add the listener callback to the realm
    try {
      realm.addListener("change", onRealmChange);
    } catch (error) {
      console.error(
        `An exception was thrown within the change listener: ${error}`
      );
    }
    // :remove-start:
    realm.write(() => {
      dog = realm.create("Dog", {
        name: "Spot",
      });
    });
    // :remove-end:
    // Remember to remove the listener when you're done!
    realm.removeListener("change", onRealmChange);
    // :snippet-end:

    // if 'hasRealmChanged' is true, the listener has successfully been registered and fired
    expect(hasRealmChanged).toBe(true);

    // delete the realm objects to make the test idempotent
    realm.write(() => {
      realm.delete(dog);
    });
    realm.close();
  });
  test("Register a Collection Change Listener", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm",
      schema: [DogSchema],
    });
    let dog;

    // boolean values to test if a change has registered
    let dogHasBeenInserted = false;
    let dogHasBeenModified = false;
    let dogHasBeenDeleted = false;

    // :snippet-start: react-to-changes-register-collection-change-listener
    // You can define a listener for any collection of Realm objects
    const dogs = realm.objects("Dog");
    // Define a listener callback function for changes to any Dog
    function onDogsChange(dogs, changes) {
      // Handle deleted Dog objects
      changes.deletions.forEach((index) => {
        // You cannot directly access deleted objects,
        // but you can update a UI list, etc. based on the index.
        console.log(`Looks like Dog #${index} has left the realm.`);
        // :remove-start:
        dogHasBeenDeleted = true;
        // :remove-end:
      });

      // Handle newly added Dog objects
      changes.insertions.forEach((index) => {
        const insertedDog = dogs[index];
        console.log(`Welcome our new friend, ${insertedDog.name}!`);
        // :remove-start:
        dogHasBeenInserted = true;
        // :remove-end:
      });
      // Handle Dog objects that were modified
      changes.modifications.forEach((index) => {
        const modifiedDog = dogs[index];
        console.log(`Hey ${modifiedDog.name}, you look different!`);
        // :remove-start:
        dogHasBeenModified = true;
        // :remove-end:
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
    // :remove-start:

    realm.write(() => {
      dog = realm.create("Dog", {
        name: "Spotto",
        age: 2,
      });
    });
    realm.write(() => {
      dog.age += 1;
    });
    realm.write(() => {
      realm.delete(dog);
    });
    // An empty write transaction is preformed to refresh the realm and deliver the pending (delete event) notification
    realm.write(() => {});
    // :remove-end:
    // Remember to remove the listener when you're done!
    dogs.removeListener(onDogsChange);
    // :snippet-end:

    expect(dogHasBeenInserted).toBe(true);
    expect(dogHasBeenModified).toBe(true);
    expect(dogHasBeenDeleted).toBe(true);

    realm.close();
  });
  test("should register a change listener on the realm object", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm",
      schema: [DogSchema],
    });
    let dog;
    // boolean values to test if a change has registered
    let dogHasBeenDeleted = false;
    let propertyHasChanged = false;

    // :snippet-start: react-to-changes-register-realm-object-change-listener

    // Define a listener callback function for changes to a specific Dog
    function onDogChange(dog, changes) {
      if (changes.deleted) {
        console.log(`dog is deleted: ${changes.deleted}`);
        // :remove-start:
        dogHasBeenDeleted = true;
        // :remove-end:
      } else {
        // :remove-start:
        propertyHasChanged = true;
        // :remove-end:
        changes.changedProperties.forEach((prop) => {
          console.log(`* the value of "${prop}" changed to ${dog[prop]}`);
        });
      }
    }
    // :remove-start:
    realm.write(() => {
      dog = realm.create("Dog", {
        name: "Fido",
        age: 4,
      });
    });
    // :remove-end:
    // You can define a listener for any Realm object
    try {
      dog.addListener(onDogChange);
    } catch (error) {
      console.error(
        `An exception was thrown within the change listener: ${error}`
      );
    }
    // :remove-start:
    realm.write(() => {
      dog.age += 1;
    });
    realm.write(() => {
      realm.delete(dog);
    });
    // An empty write transaction is preformed to refresh the realm and deliver the pending (delete event) notification
    realm.write(() => {});
    // :remove-end:
    // Remember to remove the listeners when you're done!
    dog.removeListener(onDogChange);
    // :snippet-end:

    expect(propertyHasChanged).toBe(true);
    expect(dogHasBeenDeleted).toBe(true);
    realm.close();
  });
  test("should remove all listeners", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm",
      schema: [DogSchema],
    });
    let dog;
    const dogs = realm.objects("Dog");
    // boolean values to test if a change has been registered
    let realmHasChanged = false;
    let collectionHasChanged = false;
    let realmObjectHasChanged = false;

    realm.write(() => {
      dog = realm.create("Dog", { name: "Winter", age: 3 });
    });

    try {
      // realm listener
      realm.addListener("change", () => {
        realmHasChanged = true;
      });
      // realm collection listner
      dogs.addListener(() => {
        collectionHasChanged = true;
      });
      dog.addListener(() => {
        realmObjectHasChanged = true;
      });
    } catch (error) {
      console.error(
        `An exception was thrown within the change listener: ${error}`
      );
    }

    // :snippet-start: react-to-changes-remove-all-listeners
    // Remove all listeners from a realm
    realm.removeAllListeners();
    // Remove all listeners from a collection
    dogs.removeAllListeners();
    // Remove all listeners from an object
    dog.removeAllListeners();
    // :snippet-end:

    // a change occurs on the realm, collection, and object, but the listeners will not fire because they have been removed
    realm.write(() => {
      dog.age += 1;
    });

    // none of the <...HasChanged> variables should be true because they are
    // only made true if a notification has been fired, and the listeners were
    // all removed before any changes were made to the realm, collection, or
    // object
    expect(realmHasChanged).toBe(false);
    expect(collectionHasChanged).toBe(false);
    expect(realmObjectHasChanged).toBe(false);

    // delete the dog
    realm.write(() => {
      realm.delete(dog);
    });

    realm.close();
  });
});
