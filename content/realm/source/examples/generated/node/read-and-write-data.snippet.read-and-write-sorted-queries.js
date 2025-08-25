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
