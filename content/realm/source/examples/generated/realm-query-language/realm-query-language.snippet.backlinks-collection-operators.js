  // Find items where any project that references the item has a quota greater than 0
  "ANY @links.Project.items.quota > 0"
  // Find items where all projects that reference the item have a quota greater than 0
  "ALL @links.Project.items.quota > 0"
