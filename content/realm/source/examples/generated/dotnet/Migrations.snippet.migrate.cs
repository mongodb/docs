var config = new RealmConfiguration
{
    SchemaVersion = 4,
    MigrationCallback = (migration, oldSchemaVersion) =>
    {
        var oldVersionPeople = migration.OldRealm.DynamicApi.All("Person");
        var newVersionPeople = migration.NewRealm.All<Person>();

        // Migrate Person objects
        for (var i = 0; i < newVersionPeople.Count(); i++)
        {
            var oldVersionPerson = oldVersionPeople.ElementAt(i);
            var newVersionPerson = newVersionPeople.ElementAt(i);

            // Changes from version 1 to 2 (adding LastName) will
            // occur automatically when Realm detects the change

            // Migrate Person from version 2 to 3:
            // Replace FirstName and LastName with FullName
            // LastName doesn't exist in version 1
            var firstName = oldVersionPerson.DynamicApi.Get<string>("FirstName");
            var lastName = oldVersionPerson.DynamicApi.Get<string>("LastName");

            if (oldSchemaVersion < 2)
            {
                newVersionPerson.FullName = firstName;
            }
            else if (oldSchemaVersion < 3)
            {
                newVersionPerson.FullName = $"{firstName} {lastName}";
            }

            // Migrate Person from version 3 to 4: replace Age with Birthday
            if (oldSchemaVersion < 4)
            {
                var birthYear =
                    DateTimeOffset.UtcNow.Year - oldVersionPerson.DynamicApi.Get<int>("Age");
                newVersionPerson.Birthday =
                    new DateTimeOffset(birthYear, 1, 1, 0, 0, 0, TimeSpan.Zero);
            }
        }
    }
};
var realm = Realm.GetInstance(config);
