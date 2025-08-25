public Employee Employee123 { get; }
...
IncompleteItems = Employee123.Items
    .AsRealmQueryable()
    .Where(i => i.IsComplete == false);
