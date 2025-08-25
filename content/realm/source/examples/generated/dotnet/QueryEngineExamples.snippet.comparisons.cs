var highPri = items.Where(i => i.Priority > 5);

var quickItems = items.Where(i =>
    i.ProgressMinutes >= 1 &&
    i.ProgressMinutes < 15);

var unassignedItems = items.Where(i =>
    i.Assignee == null);

var AliOrJamieItems = items.Where(i =>
   i.Assignee == "Ali" ||
   i.Assignee == "Jamie");
