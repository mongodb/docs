var fidosPerson = realm.All<Person>().FirstOrDefault(p => p.Dog == dog);
