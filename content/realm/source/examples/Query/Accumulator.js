console.log(
  "Number of projects with average tasks priority above 5: " +
    projects.filtered("tasks.@avg.priority > $0", 5).length
);
console.log(
  "Number of long-running projects: " +
    projects.filtered("tasks.@sum.progressMinutes > $0", 120).length
);
