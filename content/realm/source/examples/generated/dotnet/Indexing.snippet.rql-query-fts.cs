// Find all people with "scientist" and "Nobel" in their biography
var filteredScientists = realm.All<Person>()
    .Filter("Biography TEXT $0", "scientist Nobel");

// Find all people with "scientist" in their biography, but not "physics"
var filteredScientistsButNotPhysicists = realm.All<Person>()
    .Filter("Biography TEXT $0", "scientist -physics");
