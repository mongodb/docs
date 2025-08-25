console.log(
  "Number of projects with no complete tasks: " +
    projects.filtered("ALL tasks.isComplete == $0", false).length
);
console.log(
  "Number of projects with any top priority tasks: " +
    projects.filtered("ANY tasks.priority == $0", 10).length
);
