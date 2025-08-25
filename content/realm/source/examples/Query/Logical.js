console.log(
  "Number of Ali's complete tasks: " +
    tasks.filtered("assignee == $0 && isComplete == $1", "Ali", true).length
);
