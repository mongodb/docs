var katieAndHerDogs = realm.All<Person>().
    Where(p => p.Name == "Katie")
    .FirstOrDefault();
