// Get all projects with an average Item priorty > 5:
var avgPriority = projects.Filter(
    "Items.@avg.Priority > $0", 5);

// Get all projects where all Items are high-priority:
var highPriProjects = projects.Filter(
    "Items.@min.Priority > $0", 5);

// Get all projects with long-running Items:
var longRunningProjects = projects.Filter(
    "Items.@sum.ProgressMinutes > $0", 100);
