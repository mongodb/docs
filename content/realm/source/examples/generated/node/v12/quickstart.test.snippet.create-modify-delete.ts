const allTasks = realm.objects(Task);

// Add a couple of Tasks in a single, atomic transaction.
realm.write(() => {
  realm.create(Task, {
    _id: 1,
    name: "go grocery shopping",
    status: "Open",
  });

  realm.create(Task, {
    _id: 2,
    name: "go exercise",
    status: "Open",
  });
});

const task1 = allTasks.find((task) => task._id == 1);
const task2 = allTasks.find((task) => task._id == 2);

realm.write(() => {
  // Modify an object.
  task1!.status = "InProgress";

  // Delete an object.
  realm.delete(task2!);
});
