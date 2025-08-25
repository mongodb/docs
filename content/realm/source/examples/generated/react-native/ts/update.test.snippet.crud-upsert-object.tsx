const CreateTaskItem = () => {
  const realm = useRealm();

  const myTask: Realm.Object = realm.write(() => {
    // Add a new Task to the realm. Since no Task with ID 1234
    // has been added yet, this adds the instance to the realm.
    realm.create(
      'Task',
      {_id: 1234, name: 'Wash the car', progressMinutes: 0},
      'modified',
    );

    // If an object exists, setting the third parameter (`updateMode`) to
    // "modified" only updates properties that have changed, resulting in
    // faster operations.
    return realm.create(
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
