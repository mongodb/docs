import Realm from "realm";
import BSON from "bson";

describe("Node Landing Page", () => {
  test("should define a realm object schema", async () => {
    // :snippet-start: node-landing-define-object-schema
    // :uncomment-start:
    //import Realm from "realm";
    // :uncomment-end:
    const Cat = {
      name: "Cat",
      properties: {
        _id: "objectId",
        name: "string",
        age: "int",
        type: "string",
      },
    };
    // open a local realm with the 'Cat' schema
    const realm = await Realm.open({
      // :remove-start:
      path: "realm-files/landing-page",
      // :remove-end:
      schema: [Cat],
    });
    // :snippet-end:
    let cat1, cat2, cat3;
    realm.write(() => {
      cat1 = realm.create("Cat", {
        _id: new BSON.ObjectID(),
        name: "Lacy",
        age: 13,
        type: "Calico",
      });
      cat2 = realm.create("Cat", {
        _id: new BSON.ObjectID(),
        name: "Max",
        age: 8,
        type: "Tabby",
      });
      cat3 = realm.create("Cat", {
        _id: new BSON.ObjectID(),
        name: "Clover",
        age: 4,
        type: "Calico",
      });
    });

    expect(realm.objects("Cat")[0].name).toBe("Lacy");
    expect(realm.objects("Cat")[1].name).toBe("Max");
    expect(realm.objects("Cat")[2].name).toBe("Clover");

    // :snippet-start: node-landing-query-realm-database
    // retrieve the set of Cat objects
    const cats = realm.objects("Cat");
    console.log(`There are ${cats.length} cats`);
    // filter for cats that are older than 7
    const catsOlderThan7 = cats.filtered("age > 7");
    console.log(
      `There are ${catsOlderThan7.length} cats older than 7 years old`
    );
    // filter for calico cats
    const calicoCats = cats.filtered("type == 'Calico'");
    console.log(`There are ${calicoCats.length} Calico cats`);
    // :snippet-end:

    expect(cats.length).toBe(3);
    expect(catsOlderThan7.length).toBe(2);
    expect(calicoCats.length).toBe(2);

    // :snippet-start: node-landing-update-live-objects
    // find a cat named "Clover"
    const cloverCat = cats.filtered("name == 'Clover'")[0];
    // update the Cat in a write transaction
    realm.write(() => {
      // update clover's age to 5 years old
      cloverCat.age = 5;
    }); // when the transaction completes, the cat's age is updated in the database
    console.log(`Clover the cat is ${cloverCat.age} years old`);
    // :snippet-end:
    expect(cloverCat.age).toBe(5);
    expect(cloverCat.name).toBe('Clover');

    // :snippet-start:  node-landing-watch-for-object-updates
    // insert a cat into the database
    let aliceCat;
    realm.write(() => {
      aliceCat = realm.create("Cat", {
        _id: new BSON.ObjectID(),
        name: "Alice",
        age: 14,
        type: "Calico",
      });
    });
    // create a listener that logs new changes to the cat
    aliceCat.addListener((obj, changes) => {
      changes.changedProperties.forEach((changedProperty) => {
        console.log(
          `${obj.name}'s ${changedProperty} was altered to be ${obj[changedProperty]}`
        ); // This should log "Alice's age was altered to be 15"
      });
    });
    // update the cat
    realm.write(() => {
      aliceCat.age = 15;
    });

    // :snippet-end:

    // :snippet-start:  node-landing-access-the-latest-data
    // always access the latest data
    const realmInstanceA = await Realm.open({
      // :remove-start:
      path: "realm-files/landing-page",
      // :remove-end:
      schema: [Cat],
    });
    const realmInstanceB = await Realm.open({
      // :remove-start:
      path: "realm-files/landing-page",
      // :remove-end:
      schema: [Cat],
    });
    // get a reference to a single cat object
    // stored in the database from each realm instance
    const calicoCatFromRealmInstanceA = realm
      .objects("Cat")
      .filtered("type = 'Calico'")[0];
    const calicoCatFromRealmInstanceB = realm
      .objects("Cat")
      .filtered("type = 'Calico'")[0];

    // update cat A's name
    realm.write(() => {
      calicoCatFromRealmInstanceA.name = "Hestu";
    });
    // cat B instance automatically updates with the new name
    expect(calicoCatFromRealmInstanceB.name).toBe("Hestu");
    // :snippet-end:

    // close the realm, remove the listeners, and delete the objects
    aliceCat.removeListener(() => null);
    realm.write(() => {
      realm.delete(cat1);
      realm.delete(cat2);
      realm.delete(cat3);
      realm.delete(aliceCat);
    });
    realm.close();
    realmInstanceA.close();
    realmInstanceB.close();
  });
  test.skip("should automatically sync data between realms", async () => {
    const app = new Realm.App({ id: "<Your App ID>" });
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
    const Cat = {
      name: "Cat",
      properties: {
        _id: "objectId",
        name: "string",
        age: "int",
        type: "string",
      },
    };

    // :snippet-start: node-landing-sync-data-between-realms
    var config = {
      schema: [Cat], // predefined schema
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
      },
    };
    // Open a realm with a configuration object that has a SyncConfiguration
    // A SyncConfiguration requires both a logged-in user and a partition value
    let realm = await Realm.open(config);

    // :remove-start:
    let cat1;
    realm.write(() => {
      cat1 = realm.create("Cat", {
        name: "Daruk",
        age: 6,
        type: "Munchkin",
      });
    });
    // :remove-end:

    // start a write transaction
    let darukCat;
    realm.write(() => {
      // get a cat from the database to update
      darukCat = realm.objects("Cat").filtered("name = 'Daruk")[0];
      // change the cat's name
      darukCat.name = "Daruk Goron";
    }); // when the transaction completes, the cat's name is updated in the database
    // and synced to the connected Realm App

    // :snippet-end:

    // close the realm, and delete the objects
    realm.write(() => {
      realm.delete(cat1);
      realm.delete(darukCat);
    });
    realm.close();
  });
});
