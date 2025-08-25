  // Find high priority to-do items by comparing the value of the ``priority``
  // property value with a threshold number, above which priority can be considered high.
  "priority > $0", 5

  // Find long-running to-do items by seeing if the progressMinutes property is at or above a certain value.
  "progressMinutes > $0", 120

  // Find unassigned to-do items by finding items where the assignee property is equal to null.
  "assignee == $0", null

  // Find to-do items within a certain time range by finding items 
  // where the progressMinutes property is between two numbers.
  "progressMinutes BETWEEN { $0 , $1 }", 30, 60

  // Find to-do items with a certain amount of progressMinutes from the given list.
  "progressMinutes IN { $0, $1, $2, $3, $4, $5 }", 10, 20, 30, 40, 50, 60
