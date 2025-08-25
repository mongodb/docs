// Query for specific obect using primary key.
const specificTask = realm.objectForPrimaryKey(Task, 0);

// Query realm for all instances of the "Task" type.
const tasks = realm.objects(Task);

// Filter for all tasks with a status of "Open".
const openTasks = tasks.filtered("status = 'Open'");

// Sort tasks by name in ascending order.
const tasksByName = tasks.sorted("name");
