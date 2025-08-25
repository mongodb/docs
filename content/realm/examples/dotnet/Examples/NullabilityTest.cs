using System;
using Realms;
using System.Collections.Generic;
using NUnit.Framework;
using static Examples.WorkWithRealm;
using System.Linq;

namespace Examples
{
    //FYI the "#nullable enable" is commented out to get past VS auto-formatting moving it to the left.

    // :snippet-start: nullability
    // :replace-start: {
    //  "terms": {
    //   "Nullable_Foo": "Person",
    //   "Nullable_Backlink" : "Dog",
    //   "Nullable_Bar": "Dog",
    //   " = null!;" : ""}
    // }
    // :uncomment-start:
    //#nullable enable
    // :uncomment-end:
    public partial class Nullable_Foo : IRealmObject
    {
        //:remove-start:
        public Nullable_Foo()
        {
            NonNullableName = default!;
            NonNullableArray = default!;
            NonNullableInt = default!;
        }

        [PrimaryKey]
        [MapTo("_id")]
        public int Id { get; set; }
        //:remove-end:
        /* Reference Types */

        public string NonNullableName { get; set; }
        public string? NullableName { get; set; }
        public byte[] NonNullableArray { get; set; }
        public byte[]? NullableArray { get; set; }

        /* Value Types */
        public int NonNullableInt { get; set; }
        public int? NullableInt { get; set; }

        /* Realm Objects */

        public Nullable_Bar? NullableNullable_Bar { get; set; }
        // public Dog NonNullableDog { get; set; } // Compile-time error

        /* Collections of Primitives */

        public IList<int> IntListWithNonNullableValues { get; } = null!;
        public IList<int?> IntListWithNullableValues { get; } = null!;
        // public IList<int>? NullableListOfInts { get; } // Compile-time error

        /* Collections of Realm Objects */

        public IList<Nullable_Bar> ListOfNonNullableObjects { get; } = null!;
        // public IList<Nullable_Bar>? NullableListOfObjects { get; }  // Compile-time error
        // public IList<Dog?> ListOfNullableObjects { get; } // Compile-time error

        public ISet<Nullable_Backlink> SetOfNonNullableObjects { get; } = null!;
        // public ISet<Nullable_Bar>? NullableSetOfObjects { get; }  // Compile-time error
        // public ISet<Nullable_Bar?> SetOfNullableObjects { get; } // Compile-time error

        public IDictionary<string, Nullable_Bar?> DictionaryOfNullableObjects { get; } = null!;
        // public IDictionary<string, Nullable_Bar> DictionaryOfNonNullableObjects { get; } // Compile-time error
        // public IDictionary<string, Nullable_Bar>? NullableDictionaryOfObjects { get; } // Compile-time error

        [Backlink(nameof(Nullable_Bar.Person))]
        public IQueryable<Nullable_Bar> MyDogs { get; } = null!;

        // [Backlink(nameof(Nullable_Bar.People))]
        // public IQueryable<Nullable_Bar?> MyDogs { get; } // Compile-time error
    }

    //:replace-end:
    //:snippet-end:
    public partial class Nullable_Bar : IEmbeddedObject
    {
        public int Id { get; set; }
        public Nullable_Foo? Person { get; set; }
    }

    public partial class Nullable_Backlink : IRealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public int Id { get; set; }

        public Nullable_Foo? Person { get; set; }
    }
}