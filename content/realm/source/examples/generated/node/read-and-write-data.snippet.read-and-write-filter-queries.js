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
