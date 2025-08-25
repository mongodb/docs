import Realm from "realm";
import BSON from "bson";

let realm;
// :snippet-start: define-embedded-objects
const AddressSchema = {
  name: "Address",
  embedded: true, // default: false
  properties: {
    street: "string?",
    city: "string?",
    country: "string?",
    postalCode: "string?",
  },
};

const ContactSchema = {
  name: "Contact",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    name: "string",
    address: "Address", // Embed a single object
  },
};

const BusinessSchema = {
  name: "Business",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    name: "string",
    addresses: { type: "list", objectType: "Address" }, // Embed an array of objects
  },
};
// :snippet-end:

// :snippet-start:node_list
const PetOwnerSchema = {
  name: "PetOwner",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    person: "Person",
    pets: {
      type: "list",
      objectType: "string", // this could also be a Realm object:
      // objectType: "Pet",
      optional: false, //null values are not allowed
    },
  },
};
// :snippet-end:

describe("Node.js Data Types", () => {
  test("should create, update and query Realm dictionaries", async () => {
    // :snippet-start: define-dictionary-in-schema
    const PersonSchema = {
      name: "Person",
      properties: {
        name: "string",
        home: "{}",
      },
    };
    // :snippet-end:

    realm = await Realm.open({
      path: "realm-files/data-type-realm",
      schema: [PersonSchema],
    });

    // :snippet-start: create-realm-obj-with-dictionary
    let johnDoe;
    let janeSmith;
    realm.write(() => {
      johnDoe = realm.create("Person", {
        name: "John Doe",
        home: {
          windows: 5,
          doors: 3,
          color: "red",
          address: "Summerhill St.",
          price: 400123,
        },
      });
      janeSmith = realm.create("Person", {
        name: "Jane Smith",
        home: {
          address: "100 northroad st.",
          yearBuilt: 1990,
        },
      });
    });
    // :snippet-end:

    // :snippet-start: query-a-dictionary
    // query for all Person objects
    const persons = realm.objects("Person");

    // run the `.filtered()` method on all the returned persons to
    // find the house with the address "Summerhill St."
    const summerHillHouse = persons.filtered(
      `home['address'] = "Summerhill St."`
    )[0].home;

    // Find all people that have a house with a listed price
    const peopleWithHousesWithAListedPrice = persons.filtered(
      `home.@keys = "price" `
    );
    // find a house that has any field with a value of 'red'
    const redHouse = persons.filtered(`home.@values = "red" `)[0].home;
    // :snippet-end:

    // the following assertion tests both creation of a dictionary + querying a dictionary
    expect(peopleWithHousesWithAListedPrice[0].name).toBe("John Doe"); // John Doe should have a house with a listed price
    expect(redHouse.doors).toBe(3); // the red house should have 3 doors

    let dictionaryListenerHasBeenCalled = false;
    // :snippet-start: add-a-listener-to-a-dictionary
    summerHillHouse.addListener((changedHouse, changes) => {
      // :remove-start:
      dictionaryListenerHasBeenCalled = true;
      // :remove-end:
      console.log("A change has occurred to the Summer Hill House object");
    });
    // :snippet-end:

    // :snippet-start: update-a-dictionary
    realm.write(() => {
      // use the `set()` method to update a field of a dictionary
      summerHillHouse.set({ price: 400100 });
      // alternatively, update a field of a dictionary through dot notation
      summerHillHouse.color = "brown";
      // update a dictionary by adding a field
      summerHillHouse.yearBuilt = 2004;
    });
    // :snippet-end:

    expect(dictionaryListenerHasBeenCalled).toBe(true); // a home (dictionary inside a realm object) should be able to have a change listener
    expect(summerHillHouse.price).toBe(400100); // the summerHillHouse should be $400,100 now
    expect(summerHillHouse.color).toBe("brown"); // the summerHillHouse should be brown now
    expect(summerHillHouse.yearBuilt).toBe(2004); // the summerHillHouse should've been built in 2004

    console.log(summerHillHouse);
    // :snippet-start: remove-fields-of-the-dictionary
    realm.write(() => {
      // remove the 'windows' and 'doors' field of the Summerhill House.
      summerHillHouse.remove(["windows", "doors"]);
    });
    // :snippet-end:

    expect(summerHillHouse.windows).toBe(undefined); // since windows has been removed as a field, it should be undefined
    expect(summerHillHouse.doors).toBe(undefined); // since doors has been removed as a field, it should be undefined
    realm.write(() => {
      realm.delete(johnDoe);
      realm.delete(janeSmith);
    });

    realm.close();
  });
  test("should work with Mixed Type", async () => {
    // :snippet-start: define-mixed-in-schema
    const DogSchema = {
      name: "Dog",
      properties: {
        name: "string",
        birthDate: "mixed",
      },
    };
    // :snippet-end:

    realm = await Realm.open({
      path: "realm-files/data-type-realm",
      schema: [DogSchema],
    });

    // :snippet-start: create-objects-with-mixed-values
    realm.write(() => {
      // create a Dog with a birthDate value of type string
      realm.create("Dog", { name: "Euler", birthDate: "December 25th, 2017" });

      // create a Dog with a birthDate value of type date
      realm.create("Dog", {
        name: "Blaise",
        birthDate: new Date("August 17, 2020"),
      });
      // create a Dog with a birthDate value of type int
      realm.create("Dog", {
        name: "Euclid",
        birthDate: 10152021,
      });
      // create a Dog with a birthDate value of type null
      realm.create("Dog", {
        name: "Pythagoras",
        birthDate: null,
      });
    });
    // :snippet-end:

    // :snippet-start: query-objects-with-mixed-values
    // To query for Blaise's birthDate, filter for his name to retrieve the realm object.
    // Use dot notation to access the birthDate property.
    let blaiseBirthDate = realm.objects("Dog").filtered(`name = 'Blaise'`)[0]
      .birthDate;
    console.log(`Blaise's birth date is ${blaiseBirthDate}`);
    // :snippet-end:
    expect(blaiseBirthDate).toEqual(new Date("August 17, 2020"));

    // delete the objects specifically created in this test to keep tests idempotent
    const Euler = realm.objects("Dog").filtered(`name = 'Euler'`)[0];
    const Blaise = realm.objects("Dog").filtered(`name = 'Blaise'`)[0];
    const Euclid = realm.objects("Dog").filtered(`name = 'Euclid'`)[0];
    const Pythagoras = realm.objects("Dog").filtered(`name = 'Pythagoras'`)[0];
    // delete the objects to keep the tests idempotent
    realm.write(() => {
      realm.delete(Euler);
      realm.delete(Blaise);
      realm.delete(Euclid);
      realm.delete(Pythagoras);
    });

    realm.close();
  });
  test("should create and read and delete an embedded object", async () => {
    realm = await Realm.open({
      path: "realm-files/data-type-realm",
      schema: [AddressSchema, ContactSchema],
    });

    // :snippet-start: create-an-embedded-object
    //   create an embedded address object
    const sydneyOrthodontics = {
      street: "42 Wallaby Way",
      city: "Sydney",
      country: "Australia",
      postalCode: "2774",
    };
    realm.write(() => {
      // create a contact object
      realm.create("Contact", {
        _id: new BSON.ObjectId(),
        name: "Philip Sherman",
        address: sydneyOrthodontics, // embed the address in the contact object
      });
    });
    // :snippet-end:

    // :snippet-start: query-an-embedded-object
    const philipShermanAddress = realm
      .objects("Contact")
      .filtered("name = 'Philip Sherman'")[0].address.street;
    console.log(`Philip Sherman's address is ${philipShermanAddress}`);
    // :snippet-end:
    expect(philipShermanAddress).toBe("42 Wallaby Way"); // this assertion tests both the 'query-an-embedded-object' and 'create-an-embedded-object' code blocks

    // // :snippet-start: delete-an-embedded-object
    realm.write(() => {
      // Deleting the contact will delete the embedded address of that contact
      realm.delete(
        realm.objects("Contact").filtered("name = 'Philip Sherman'")
      );
    });
    // :snippet-end:

    realm.close();
  });
  // update and delete an embedded object
  test("should update and overwrite an embedded object", async () => {
    realm = await Realm.open({
      path: "realm-files/data-type-realm",
      schema: [AddressSchema, ContactSchema],
    });
    const harryAddress = {
      street: "4 Privet Drive",
      city: "Little Whinging, Surrey",
      country: "UK",
      postalCode: "WD4 8PN",
    };
    realm.write(() => {
      realm.create("Contact", {
        _id: new BSON.ObjectId(),
        name: "Harry Potter",
        address: harryAddress,
      });
    });

    // :snippet-start: update-an-embedded-object
    // Find the contact with the address you want to update
    const harryPotter = realm
      .objects("Contact")
      .filtered("name = 'Harry Potter'")[0];
    // modify the property of the embedded object in a write transaction
    realm.write(() => {
      // update the embedded object directly through the contact
      harryPotter.address.street = "1 Hogwarts Ave";
    });
    // :snippet-end:
    expect(harryPotter.address.street).toBe("1 Hogwarts Ave");

    // :snippet-start: overwrite-an-embedded-object
    // create a new address
    const harryNewAddress = {
      street: "12 Grimmauld Place",
      city: "London",
      country: "UK",
      postalCode: "E1 7AA",
    };
    realm.write(() => {
      // overwrite the embedded object with the new address within a write transaction
      harryPotter.address = harryNewAddress;
    });
    // :snippet-end:

    expect(harryPotter.address.city).toBe("London");
    realm.write(() => {
      realm.delete(harryPotter);
    });

    realm.close();
  });
  test("should work with UUID", async () => {
    // :snippet-start: work-with-uuid
    const { UUID } = Realm.BSON;
    const ProfileSchema = {
      name: "Profile",
      primaryKey: "_id",
      properties: {
        _id: "uuid",
        name: "string",
      },
    };

    const realm = await Realm.open({
      path: "realm-files/data-type-realm",
      schema: [ProfileSchema],
    });

    realm.write(() => {
      realm.create("Profile", {
        name: "John Doe.",
        _id: new UUID(), // create a _id with a randomly generated UUID
      });
      realm.create("Profile", {
        name: "Tim Doe.",
        _id: new UUID("882dd631-bc6e-4e0e-a9e8-f07b685fec8c"), // create a _id with a specific UUID value
      });
    });
    // :snippet-end:

    const johnDoeProfile = realm
      .objects("Profile")
      .filtered("name = 'John Doe.'")[0];

    const timDoeProfile = realm
      .objects("Profile")
      .filtered("name = 'Tim Doe.'")[0];
    // test if johnDoeProfile's _id is a valid UUID field
    expect(UUID.isValid(johnDoeProfile._id)).toBe(true);
    realm.write(() => {
      realm.delete(realm.objects("Profile"));
    });
    realm.close();
  });
  test("should work with the Set data type", async () => {
    // :snippet-start: define-set-objects
    const characterSchema = {
      name: "Character",
      primaryKey: "_id",
      properties: {
        _id: "objectId",
        name: "string",
        levelsCompleted: "int<>",
        inventory: "string<>",
      },
    };
    // :snippet-end:
    realm = await Realm.open({
      path: "realm-files/data-type-realm",
      schema: [characterSchema],
    });

    // :snippet-start: create-set-objects
    let playerOne, playerTwo;
    realm.write(() => {
      playerOne = realm.create("Character", {
        _id: new BSON.ObjectId(),
        name: "PlayerOne",
        inventory: ["elixir", "compass", "glowing shield"],
        levelsCompleted: [4, 9],
      });
      playerTwo = realm.create("Character", {
        _id: new BSON.ObjectId(),
        name: "PlayerTwo",
        inventory: ["estus flask", "gloves", "rune"],
        levelsCompleted: [1, 2, 5, 24],
      });
    });
    // :snippet-end:

    expect(playerOne.inventory.has("elixir")).toBe(true);
    expect(playerTwo.inventory.has("gloves")).toBe(true);

    // :snippet-start: add-items-to-set
    realm.write(() => {
      playerOne.inventory.add("hammer");
      playerOne.levelsCompleted.add(32);
    });
    // :snippet-end:

    expect(playerOne.inventory.size).toBe(4);
    expect(playerOne.levelsCompleted.size).toBe(3);

    // :snippet-start: check-if-set-has-items
    // check if playerTwo has completed level 3 by calling the `has()` method
    // on the Realm Set object
    const playerTwoHasCompletedLevelThree = playerTwo.levelsCompleted.has(3);
    console.log(
      `Is level three completed by playerTwo: ${playerTwoHasCompletedLevelThree}`
    );
    // :snippet-end:
    expect(playerTwoHasCompletedLevelThree).toBe(false);

    // :snippet-start: remove-specific-item-from-set
    realm.write(() => {
      // remove the compass from playerOne's inventory by calling the
      // `delete()` method of the Realm Set object within a write transaction
      playerOne.inventory.delete("compass");
    });

    // :snippet-end:
    expect(playerOne.inventory.has("compass")).toBe(false);

    // :snippet-start: remove-all-items-from-set
    realm.write(() => {
      // clear all data from the inventory slot of playerTwo by calling
      // the `clear()` method of the Realm Set object in a write transaction
      playerTwo.inventory.clear();
    });
    // :snippet-end:

    // :snippet-start: check-set-size
    // check how many items playerTwo has in his inventory through the `size`
    // property of the Realm Set object
    const playerTwoInventorySize = playerTwo.inventory.size;
    console.log(`playerTwo has ${playerTwoInventorySize} inventory items`);
    // :snippet-end:
    expect(playerTwo.inventory.size).toBe(0);

    // convert set to array.
    const additions = ["zombie", "dog", "map", "apple", "envelope"];
    realm.write(() => {
      playerTwo.inventory.add(additions[0]);
      playerTwo.inventory.add(additions[1]);
      playerTwo.inventory.add(additions[2]);
      playerTwo.inventory.add(additions[3]);
      playerTwo.inventory.add(additions[4]);
    });
    console.log(playerTwo.inventory.values());

    // size property counts number of items in set
    expect(playerTwo.inventory.size).toBe(5);

    // convert to array with Array.from()
    const setAsArr = Array.from(playerTwo.inventory);
    expect(setAsArr.length).toBe(playerTwo.inventory.size);

    // also convert to array with [...set]
    const setAsArrAlt = [...playerTwo.inventory];
    expect(setAsArr).toStrictEqual(setAsArrAlt);

    // conversion to array **doesn't** guarantee insertion order
    expect(setAsArr).not.toStrictEqual(additions);
    realm.write(() => {
      realm.delete(playerOne);
      realm.delete(playerTwo);
    });
    realm.close();
  });

  test("should traverse a set", async () => {
    const characterSchema = {
      name: "Character",
      primaryKey: "_id",
      properties: {
        _id: "objectId",
        name: "string",
        levelsCompleted: "int<>",
        inventory: "string<>",
      },
    };

    let playerOne;
    try {
      realm = await Realm.open({
        path: "realm-files/data-type-realm",
        schema: [characterSchema],
      });
      realm.write(() => {
        playerOne = realm.create("Character", {
          _id: new BSON.ObjectId(),
          name: "PlayerOne",
          inventory: ["potion", "wand", "spell book"],
          levelsCompleted: [],
        });
      });
      // :snippet-start: traverse-a-set
      playerOne.inventory.forEach((item) => {
        console.log(item);
      });
      // :snippet-end:
    } catch (err) {
      console.error("error is", err);
    }
    let totItems = 0;
    playerOne.inventory.forEach((item) => totItems++);
    expect(totItems).toBe(3);
    realm.write(() => {
      realm.delete(playerOne);
    });
    realm.close();
  });

  test("should convert set to array with insertion order", async () => {
    const characterSchema = {
      name: "Character",
      primaryKey: "_id",
      properties: {
        _id: "objectId",
        name: "string",
        levelsCompleted: "int<>",
        inventory: "string<>",
      },
    };
    // :snippet-start: make-array-with-insertion-order-from-set
    function updateSetAndOrderedSetArray(set, orderedArray, value) {
      const oldSize = set.size;
      set.add(value);
      if (set.size > oldSize) {
        orderedArray.push(value);
      }
    }

    let playerOne;
    let levelsCompletedInOrder = [];
    const realm = await Realm.open({
      path: "realm-files/data-type-realm",
      schema: [characterSchema],
    });
    realm.write(() => {
      playerOne = realm.create("Character", {
        _id: new BSON.ObjectId(),
        name: "PlayerOne",
        inventory: ["potion", "wand", "spell book"],
        levelsCompleted: [],
      });
    });
    realm.write(() => {
      updateSetAndOrderedSetArray(
        playerOne.levelsCompleted,
        levelsCompletedInOrder,
        5
      );
    });
    realm.write(() => {
      updateSetAndOrderedSetArray(
        playerOne.levelsCompleted,
        levelsCompletedInOrder,
        12
      );
    });
    realm.write(() => {
      updateSetAndOrderedSetArray(
        playerOne.levelsCompleted,
        levelsCompletedInOrder,
        2
      );
    });
    realm.write(() => {
      updateSetAndOrderedSetArray(
        playerOne.levelsCompleted,
        levelsCompletedInOrder,
        7
      );
    });
    console.log("set ordered", Array.from(playerOne.levelsCompleted)); // not necessarily [5, 12, 2, 7]
    console.log("insert ordered", levelsCompletedInOrder); // [5, 12, 2, 7]
    // :remove-start:
    expect(Array.from(playerOne.levelsCompleted)).toStrictEqual([2, 5, 7, 12]);
    expect(levelsCompletedInOrder).toStrictEqual([5, 12, 2, 7]);
    realm.write(() => {
      realm.delete(playerOne);
    });
    // :remove-end:
    // close the realm
    realm.close();
    // :snippet-end:
  });

  test("should create a dictionary with a percent-encoded key", async () => {
    const PersonSchema = {
      name: "Person",
      properties: {
        name: "string",
        home: "{}",
      },
    };

    realm = await Realm.open({
      path: "realm-files/data-type.realm",
      schema: [PersonSchema],
    });

    // :snippet-start: percent-encode-disallowed-characters
    // Percent encode . or $ characters to use them in map keys
    const mapKey = "kitchen.windows";
    const encodedMapKey = mapKey.replace(".", "%2E");
    // :snippet-end:
    expect(encodedMapKey).toBe("kitchen%2Ewindows");

    let janeSmith;
    realm.write(() => {
      janeSmith = realm.create("Person", {
        name: "Jane Smith",
        home: {
          [encodedMapKey] : 5,
        },
      });
    });

    const persons = realm.objects("Person");
    const jane = persons[0];
    const janesHome = jane.home;
    const encodedKeyValue = janesHome["kitchen%2Ewindows"];

    expect(encodedKeyValue).toBe(5);

    realm.write(() => {
      realm.delete(janeSmith);
    });

    realm.close();
  });
});
