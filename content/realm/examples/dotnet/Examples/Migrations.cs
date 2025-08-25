using System;
using System.Linq;
using MongoDB.Bson;
using Realms;
using Realms.Schema;

namespace Examples
{
    public class Migrations
    {
        public Migrations()
        {
            // :snippet-start: migrate
            var config = new RealmConfiguration
            {
                SchemaVersion = 4,
                MigrationCallback = (migration, oldSchemaVersion) =>
                {
                    //:replace-start: {
                    // "terms": {
                    //   "PersonK": "Person",
                    //   "PersonM":"Person"}
                    // }
                    var oldVersionPeople = migration.OldRealm.DynamicApi.All("PersonK");
                    var newVersionPeople = migration.NewRealm.All<PersonM>();
                    // :replace-end:

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
            // :snippet-end:
        }
    }
    // :snippet-start: ro1
    //:replace-start: {
    // "terms": {
    //   "PersonJ": "Person"}
    // }
    public partial class PersonJ : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }

        public string FirstName { get; set; }
        public int Age { get; set; }
    }
    //:replace-end:
    // :snippet-end:

    // :snippet-start: ro2
    //:replace-start: {
    // "terms": {
    //   "PersonK": "Person"
    // }}
    public partial class PersonK : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
    }
    // :replace-end:
    // :snippet-end:

    // :snippet-start: ro3
    //:replace-start: {
    // "terms": {
    //   "PersonL": "Person"
    // }}
    public partial class PersonL : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }

        public string FullName { get; set; }
        public int Age { get; set; }
    }
    // :replace-end:
    // :snippet-end:

    // :snippet-start: ro4
    //:replace-start: {
    // "terms": {
    //   "PersonM": "Person"
    // }}
    public partial class PersonM : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }

        public string FullName { get; set; }
        public DateTimeOffset Birthday { get; set; }
    }
    // :replace-end:
    // :snippet-end:
}
