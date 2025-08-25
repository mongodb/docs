import Realm from "realm";

// :snippet-start: task-schema-crud
const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    priority: "int?",
    progressMinutes: "int?",
  },
  primaryKey: "_id",
};
// :snippet-end:

// :snippet-start: person-schema-crud
const PersonSchema = {
  name: "Person",
  properties: {
    name: "string",
    age: "int?",
  },
};
// :snippet-end:

// :snippet-start: dog-schema-crud
const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    owner: "Person?",
    age: "int?",
  },
};
// :snippet-end:

// :snippet-start: cat-schema-crud
const CatSchema = {
  name: "Cat",
  properties: {
    name: "string",
  },
};
// :snippet-end:

describe("Read & Write Data", () => {
  test("should find a specific object by primary key", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [TaskSchema],
    });

    let task;

    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 12342245,
        name: "Do the dishes",
      });
    });

    // :snippet-start: read-and-write-data-object-for-primary-key
    const myTask = realm.objectForPrimaryKey("Task", 12342245); // search for a realm object with a primary key that is an int.
    // :snippet-end:

    expect(myTask.name).toBe(task.name);

    realm.write(() => {
      // after running test delete the task
      realm.delete(task);
    });
    // close the realm
    realm.close();
  });
  test("should query an object type", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [TaskSchema],
    });

    let task;

    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 321512,
        name: "Walk the dog",
      });
    });

    // :snippet-start: read-and-write-data-query-an-object-type
    // Query realm for all instances of the "Task" type.
    const tasks = realm.objects("Task");
    // :snippet-end:

    expect(tasks[0].name).toBe(task.name);

    realm.write(() => {
      // after running test delete the task
      realm.delete(task);
    });
    // close the realm
    realm.close();
  });
  test("should return objects from filter queries", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [TaskSchema],
    });
    let task, task2, task3;
    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 191230,
        name: "go grocery shopping",
        priority: 10,
        progressMinutes: 50,
      });
      task2 = realm.create("Task", {
        _id: 325212012,
        name: "throw out the trash",
        priority: 4,
        progressMinutes: 0,
      });
      task3 = realm.create("Task", {
        _id: 43259540,
        name: "do the laundry",
        priority: 2,
        progressMinutes: 5,
      });
    });

    // :snippet-start: read-and-write-filter-queries
    // retrieve the set of Task objects
    const tasks = realm.objects("Task");
    // filter for tasks with a high priority
    const highPriorityTasks = tasks.filtered("priority > $0", 5);
    // filter for tasks that have just-started or short-running progress
    const lowProgressTasks = tasks.filtered(
      "$0 <= progressMinutes && progressMinutes < $1",
      1,
      10
    );
    console.log(
      `Number of high priority tasks: ${highPriorityTasks.length} \n`,
      `Number of just-started or short-running tasks: ${lowProgressTasks.length}`
    );
    // :snippet-end:

    expect(highPriorityTasks[0].name).toBe(task.name); // expect that 'go grocery shopping' should be the first (and only) high priority
    expect(lowProgressTasks[0].name).toBe(task3.name); // expect that 'do the laundry' should be the first (and only) low progress task
    // delete tasks
    realm.write(() => {
      realm.delete(task);
      realm.delete(task2);
      realm.delete(task3);
    });
    // close the realm
    realm.close();
  });
  test("should return objects from sorted queries", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [TaskSchema, PersonSchema, DogSchema],
    });
    let task, task2, task3, task4;
    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 191230,
        name: "go grocery shopping",
        priority: 10,
        progressMinutes: 50,
      });
      task2 = realm.create("Task", {
        _id: 325212012,
        name: "throw out the trash",
        priority: 4,
        progressMinutes: 0,
      });
      task3 = realm.create("Task", {
        _id: 43259540,
        name: "wash and dry the laundry",
        priority: 2,
        progressMinutes: 5,
      });
      task4 = realm.create("Task", {
        _id: 24132021,
        name: "fold the laundry",
        priority: 2,
        progressMinutes: 0,
      });
    });

    let person1, person2;
    let dog1, dog2;
    realm.write(() => {
      person1 = realm.create("Person", {
        name: "Moe Chughtai",
      });
      person2 = realm.create("Person", {
        name: "Chris Bush",
      });
      dog1 = realm.create("Dog", {
        name: "Barky",
        owner: person1,
      });
      dog2 = realm.create("Dog", {
        name: "Fido",
        owner: person2,
      });
    });

    // :snippet-start: read-and-write-sorted-queries
    // retrieve the set of Task objects
    const tasks = realm.objects("Task");
    // Sort tasks by name in ascending order
    const tasksByName = tasks.sorted("name");
    // Sort tasks by name in descending order
    const tasksByNameDescending = tasks.sorted("name", true);
    // Sort tasks by priority in descending order and then by name alphabetically
    const tasksByPriorityDescendingAndName = tasks.sorted([
      ["priority", true],
      ["name", false],
    ]);
    // Sort dogs by dog's owner's name.
    let dogsByOwnersName = realm.objects("Dog").sorted("owner.name");
    // :snippet-end:

    // tasks sorted by name ascending
    expect(tasksByName.map((myTask) => myTask.name)).toStrictEqual([
      "fold the laundry",
      "go grocery shopping",
      "throw out the trash",
      "wash and dry the laundry",
    ]);

    // tasks sorted by name descending
    expect(tasksByNameDescending.map((myTask) => myTask.name)).toStrictEqual([
      "wash and dry the laundry",
      "throw out the trash",
      "go grocery shopping",
      "fold the laundry",
    ]);

    // tasks sorted by priority descending, and then by name ascending
    expect(
      tasksByPriorityDescendingAndName.map((myTask) => myTask.name)
    ).toStrictEqual([
      "go grocery shopping",
      "throw out the trash",
      "fold the laundry",
      "wash and dry the laundry",
    ]);
    // dogs by dog's owner's name.
    expect(JSON.stringify(dogsByOwnersName)).toBe(
      JSON.stringify([
        { name: "Fido", owner: { name: "Chris Bush", age: null }, age: null },
        {
          name: "Barky",
          owner: { name: "Moe Chughtai", age: null },
          age: null,
        },
      ])
    );

    // delete tasks, persons, and dogs
    realm.write(() => {
      realm.delete(task);
      realm.delete(task2);
      realm.delete(task3);
      realm.delete(task4);

      realm.delete(person1);
      realm.delete(person2);

      realm.delete(dog1);
      realm.delete(dog2);
    });
    // close the realm
    realm.close();
  });
  test("should write a new object", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [DogSchema, PersonSchema],
    });
    // :snippet-start: read-and-write-create-a-new-object
    // Declare the variable that will hold the dog instance.
    let dog;
    // Open a transaction.
    realm.write(() => {
      // Assign a newly-created instance to the variable.
      dog = realm.create("Dog", { name: "Max", age: 5 });
    });
    // use newly created dog object
    // :snippet-end:

    const dogs = realm.objects("Dog");

    expect(dogs[0].name).toBe(dog.name);

    // delete the dog
    realm.write(() => {
      realm.delete(dog);
    });

    realm.close();
  });
  test("should update an object", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [DogSchema, PersonSchema],
    });
    let dog;
    realm.write(() => {
      dog = realm.create("Dog", { name: "Max", age: 2 });
    });

    // :snippet-start: read-and-write-update-an-object
    // Open a transaction.
    realm.write(() => {
      // Get a dog to update.
      const dog = realm.objects("Dog")[0];
      // Update some properties on the instance.
      // These changes are saved to the realm.
      dog.name = "Maximilian";
      dog.age += 1;
    });
    // :snippet-end:

    expect(dog.name).toBe("Maximilian");
    expect(dog.age).toBe(3);

    // delete the dog
    realm.write(() => {
      realm.delete(dog);
    });
    realm.close();
  });
  test("should upsert an object", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [DogSchema, PersonSchema],
    });
    let person;
    // :snippet-start: read-and-write-upsert-an-object
    realm.write(() => {
      // Add a new person to the realm. Since nobody with ID 1234
      // has been added yet, this adds the instance to the realm.
      person = realm.create(
        "Person",
        { _id: 1234, name: "Joe", age: 40 },
        "modified"
      );

      // :remove-start:
      // expect there to be a person with a name of Joe and age 40
      expect(person.name).toBe("Joe");
      expect(person.age).toBe(40);
      // :remove-end:
      // If an object exists, setting the third parameter (`updateMode`) to
      // "modified" only updates properties that have changed, resulting in
      // faster operations.
      person = realm.create(
        "Person",
        { _id: 1234, name: "Joseph", age: 40 },
        "modified"
      );
    });
    // :snippet-end:

    // expect there to be a person age of 40, and name of Andy
    expect(person.name).toBe("Joseph");
    expect(person.age).toBe(40);

    realm.write(() => {
      realm.delete(person);
    });

    realm.close();
  });
  test("should bulk update a collection", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [DogSchema, PersonSchema],
    });

    let dog1, dog2, dog3;
    realm.write(() => {
      dog1 = realm.create("Dog", {
        name: "Fall",
        age: 5,
      });
      dog2 = realm.create("Dog", {
        name: "Winter",
        age: 1,
      });
      dog3 = realm.create("Dog", {
        name: "Summer",
        age: 1,
      });
    });

    // :snippet-start: read-and-write-bulk-update
    realm.write(() => {
      // Create someone to take care of some dogs.
      const person = realm.create("Person", { name: "Ali" });
      // Find dogs younger than 2.
      const puppies = realm.objects("Dog").filtered("age < 2");
      // Loop through to update.
      for (const puppy of puppies) {
        // Give all puppies to Ali.
        puppy.owner = person;
      }
    });
    // :snippet-end:

    // dog1 should not have an owner because only the dogs younger than 2 have been given an owner
    expect(dog1.owner).toBe(null);

    // dog2 and dog3 should be owned by Ali
    expect(dog2.owner.name).toBe("Ali");
    expect(dog3.owner.name).toBe("Ali");

    realm.write(() => {
      realm.delete(realm.objects("Person").filtered("name == 'Ali'"));
      realm.delete(dog1);
      realm.delete(dog2);
      realm.delete(dog3);
    });

    realm.close();
  });
  test("should delete an object", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [DogSchema, PersonSchema],
    });

    let dog;
    realm.write(() => {
      dog = realm.create("Dog", {
        name: "Fall",
      });
    });

    // :snippet-start: read-and-write-delete-object
    realm.write(() => {
      // Delete the dog from the realm.
      realm.delete(dog);
      // Discard the reference.
      dog = null;
    });
    // :snippet-end:

    // there should be no dogs, since the only dog was deleted
    expect(realm.objects("Dog").length).toBe(0);
  });
  test("should delete multiple objects", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [DogSchema, PersonSchema],
    });
    let dog1; // dog1 is the only dog declared because the other dogs are deleted in the code example 'read-and-write-delete-multiple-objects'
    realm.write(() => {
      dog1 = realm.create("Dog", {
        name: "Fall",
        age: 5,
      });
      realm.create("Dog", {
        name: "Winter",
        age: 1,
      });
      realm.create("Dog", {
        name: "Summer",
        age: 1,
      });
    });

    // :snippet-start: read-and-write-delete-multiple-objects
    realm.write(() => {
      // Find dogs younger than 2 years old.
      const puppies = realm.objects("Dog").filtered("age < 2");
      // Delete the collection from the realm.
      realm.delete(puppies);
    });
    // :snippet-end:

    const dogs = realm.objects("Dog");

    // expect that the only dog left is the dog with an age greater than 2
    expect(dogs.map((myDog) => myDog.name)).toStrictEqual(["Fall"]);

    realm.write(() => {
      realm.delete(dog1); // only delete dog1 because dog2 and dog3 have already been deleted
    });

    realm.close();
  });
  test("should delete all objects of a specific type", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [CatSchema],
    });

    let cat;
    realm.write(() => {
      cat = realm.create("Cat", {
        name: "Garfield",
        age: 5,
      });
    });

    // :snippet-start: read-and-write-delete-all-objects-of-a-specific-type
    realm.write(() => {
      // Delete all instances of Cat from the realm.
      realm.delete(realm.objects("Cat"));
    });
    // :snippet-end:

    expect(realm.objects("Cat").length).toBe(0);

    realm.close();
  });
  test("should delete all objects", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "realm-files/myrealm2",
      schema: [CatSchema, TaskSchema],
    });
    let cat1, cat2, task1, task2;
    realm.write(() => {
      cat1 = realm.create("Cat", {
        name: "Alice",
        age: 13,
      });
      cat2 = realm.create("Cat", {
        name: "Snowball",
        age: 8,
      });
      task1 = realm.create("Task", {
        _id: 191230,
        name: "go grocery shopping",
        priority: 10,
        progressMinutes: 50,
      });
      task2 = realm.create("Task", {
        _id: 325212012,
        name: "throw out the trash",
        priority: 4,
        progressMinutes: 0,
      });
    });

    // :snippet-start: read-and-write-delete-all
    realm.write(() => {
      // Delete all objects from the realm.
      realm.deleteAll();
    });
    // :snippet-end:

    // there should be no objects, so the length of any objects will be 0.
    expect(realm.objects("Cat").length).toBe(0);
    expect(realm.objects("Task").length).toBe(0);

    realm.close();
  });
});
