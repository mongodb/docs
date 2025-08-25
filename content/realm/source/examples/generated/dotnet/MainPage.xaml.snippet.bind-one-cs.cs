public Employee Employee123 { get; }
...
Employee123 = realm.All<Employee>()
    .FirstOrDefault(e => e.EmployeeId == "123");
