using System;
using System.Collections.Generic;
using MongoDB.Bson;
using Realms;

namespace Examples
{
    // Used by 3 tests in Objects.cs

    // :snippet-start: dog_class
    // :replace-start: {
    //  "terms": {
    //   "Dog_OMAS": "Dog" }
    // }
    public partial class Dog_OMAS : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }
        public string Breed { get; set; }
        public IList<Person> Owners { get; }
    }

    public partial class Person : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; }

        public string Name { get; set; }
        // etc...

        /* To add items to the IList<T>:

        var dog = new Dog();
        var caleb = new Person { Name = "Caleb" };
        dog.Owners.Add(caleb);

        */
    }
    // :replace-end:
    // :snippet-end:
}

