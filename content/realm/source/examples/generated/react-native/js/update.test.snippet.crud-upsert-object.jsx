const CreateTaskItem = () => {
  const realm = useRealm();

  let myTask;
  realm.write(() => {
    // Add a new Task to the realm. Since no task with ID 1234
    // has been added yet, this adds the instance to the realm.
    myTask = realm.create(
      'Task',
      {_id: 1234, name: 'Wash the car', progressMinutes: 0},
      'modified',
    );

    // If an object exists, setting the third parameter (`updateMode`) to
    // "modified" only updates properties that have changed, resulting in
    // faster operations.
    myTask = realm.create(
      'Task',
      {_id: 1234, name: 'Wash the car', progressMinutes: 5},
      'modified',
    );
  });
  return (
    <>
      <Text>{myTask.name}</Text>
      <Text>Progress made (in minutes):</Text>
      <Text>{myTask.progressMinutes}</Text>
    </>
  );
};
