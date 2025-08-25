import Realm, {
  BSON,
  Credentials,
  ErrorCallback,
  CompensatingWriteError,
  ObjectSchema,
} from "realm";
import { APP_ID } from "../config";

describe("Sync Errors", () => {
  class Person extends Realm.Object<Person> {
    _id!: BSON.ObjectId;
    name!: string;
    age!: number;

    static schema: ObjectSchema = {
      name: "Person",
      properties: {
        _id: "objectId",
        name: "string",
        age: "int",
      },
      primaryKey: "_id",
    };
  }

  class Turtle extends Realm.Object<Turtle> {
    _id!: BSON.ObjectId;
    name!: string;
    owner?: Person;
    age!: number;

    static schema: ObjectSchema = {
      name: "Turtle",
      properties: {
        _id: "objectId",
        name: "string",
        owner: "Person?",
        age: "int",
      },
      primaryKey: "_id",
    };
  }

  beforeEach(() => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();
  });

  test("compensating write error", async () => {
    const personId = new BSON.ObjectId();
    const turtleId = new BSON.ObjectId();

    let errorCallBackInvoked = false;

    // :snippet-start: handle-compensating-write-error
    const errorCallback: ErrorCallback = (session, error) => {
      // Check if error type matches CompensatingWriteError.
      if (error instanceof CompensatingWriteError) {
        // Handle the compensating write error as needed.
        console.debug({
          name: error.name,
          code: error.code,
          message: error.message,
          atlasLogUrl: error.logUrl,
        });

        const compensatingWrites = error.writes.sort((a, b) =>
          (a.primaryKey as BSON.ObjectId)
            .toString()
            .localeCompare((b.primaryKey as BSON.ObjectId).toString())
        );

        console.debug(compensatingWrites);
        // :remove-start:
        expect(error.writes.length).toEqual(2);

        expect(
          (compensatingWrites[0].primaryKey as BSON.ObjectId).equals(personId)
        ).toBe(true);
        expect(
          (compensatingWrites[1].primaryKey as BSON.ObjectId).equals(turtleId)
        ).toBe(true);

        expect(compensatingWrites[0].objectName).toEqual(Person.name);
        expect(compensatingWrites[1].objectName).toEqual(Turtle.name);

        expect(compensatingWrites[0].reason).toContain(
          "object is outside of the current query view"
        );
        expect(compensatingWrites[1].reason).toContain(
          "object is outside of the current query view"
        );

        errorCallBackInvoked = true;
        // :remove-end:
      }
    };

    const app = new Realm.App({
      id: APP_ID,
    });

    const credentials = Credentials.anonymous();
    await app.logIn(credentials);

    const realm = await Realm.open({
      schema: [Person, Turtle],
      sync: {
        flexible: true,
        user: app.currentUser!,
        onError: errorCallback, // :emphasize:
      },
    });
    // :snippet-end:

    await realm.subscriptions.update((mutableSubs) => {
      mutableSubs.removeAll();
      mutableSubs.add(realm.objects(Person).filtered("age < 30"));
      mutableSubs.add(realm.objects(Turtle).filtered("age > 5"));
    });

    realm.write(() => {
      //Outside subscriptions
      const tom = realm.create(Person, {
        _id: personId,
        name: "Tom",
        age: 36,
      });
      realm.create(Turtle, {
        _id: turtleId,
        name: "Phillip",
        owner: tom,
        age: 1,
      });

      //Inside subscriptions
      const luigi = realm.create(Person, {
        _id: new BSON.ObjectId(),
        name: "Luigi",
        age: 20,
      });
      realm.create(Turtle, {
        _id: new BSON.ObjectId(),
        name: "Goomba",
        owner: luigi,
        age: 6,
      });
    });

    await realm.syncSession?.uploadAllLocalChanges();

    // Ensure that the error callback actually runs.
    expect(errorCallBackInvoked).toBe(true);
  });
});
