// Find all people with "scientist" and "Nobel" in their biography
var scientists = realm.All<Person>()
    .Where(p => QueryMethods.FullTextSearch(p.Biography, "scientist Nobel"));

// Find all people with "scientist" in their biography, but not "physics"
var scientistsButNotPhysicists = realm.All<Person>()
    .Where(p => QueryMethods.FullTextSearch(p.Biography, "scientist -physics"));
