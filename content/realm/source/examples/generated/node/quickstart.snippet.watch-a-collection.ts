// Define the collection notification listener.
const listener = (
  tasks: Realm.Collection<Task>,
  changes: Realm.CollectionChangeSet
) => {
  // Update UI in response to deleted objects.
  changes.deletions.forEach((index) => {
    // Deleted objects cannot be accessed directly,
    // but we can update a UI list, etc. knowing the index.
    console.log(`A task was deleted at the ${index} index.`);
    // ...
  });

  // Update UI in response to inserted objects.
  changes.insertions.forEach((index) => {
    const insertedTasks = tasks[index];
    console.log(`insertedTasks: ${JSON.stringify(insertedTasks, null, 2)}`);
    // ...
  });

  // Update UI in response to modified objects.
  // `newModifications` contains an index to the modified object's position
  // in the collection after all deletions and insertions have been applied.
  changes.newModifications.forEach((index) => {
    const modifiedTask = tasks[index];
    console.log(`modifiedTask: ${JSON.stringify(modifiedTask, null, 2)}`);
    // ...
  });
};

// Observe collection notifications.
tasks.addListener(listener);
