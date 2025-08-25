  // Returns projects with items that have not been completed
  // by a user named Alex.
  "SUBQUERY(items, $item, $item.isComplete == false AND $item.assignee == 'Alex').@count > 0"

  // Returns the projects where the number of completed items is
  // greater than or equal to the value of a project's `quota` property.
  "SUBQUERY(items, $item, $item.isComplete == true).@count >= quota"
