  // Find items that are referenced by multiple projects
  "projects.@count > 1"
  // Find items that are not referenced by any project
  "@links.Project.items.@count == 0"
  // Find items that belong to a project where the average item has
  // been worked on for at least 5 minutes
  "@links.Project.items.items.@avg.progressMinutes > 10"
