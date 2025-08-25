const highPriorityTasks = tasks.filtered("priority > $0", 5);
const unassignedTasks = tasks.filtered("assignee == $0", null);
const lowProgressTasks = tasks.filtered("$0 <= progressMinutes && progressMinutes < $1", 1, 10);
const aliTasks = tasks.filtered("assignee == $0", "Ali");

console.log(
  `Number of high priority tasks: ${highPriorityTasks.length}`,
  `Number of unassigned tasks: ${unassignedTasks.length}`,
  `Number of just-started or short-running tasks: ${lowProgressTasks.length}`,
  `Number of tasks for Ali: ${aliTasks.length}`
);
