var results = persons.Aggregate()
    .Match(p => p.Vocation == "ENGINEER")
