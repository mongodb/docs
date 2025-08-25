#nullable enable
public partial class Person : IRealmObject
{
    /* Reference Types */

    public string NonNullableName { get; set; }
    public string? NullableName { get; set; }
    public byte[] NonNullableArray { get; set; }
    public byte[]? NullableArray { get; set; }

    /* Value Types */
    public int NonNullableInt { get; set; }
    public int? NullableInt { get; set; }

    /* Realm Objects */

    public Dog? NullableDog { get; set; }
    // public Dog NonNullableDog { get; set; } // Compile-time error

    /* Collections of Primitives */

    public IList<int> IntListWithNonNullableValues { get; }
    public IList<int?> IntListWithNullableValues { get; }
    // public IList<int>? NullableListOfInts { get; } // Compile-time error

    /* Collections of Realm Objects */

    public IList<Dog> ListOfNonNullableObjects { get; }
    // public IList<Dog>? NullableListOfObjects { get; }  // Compile-time error
    // public IList<Dog?> ListOfNullableObjects { get; } // Compile-time error

    public ISet<Dog> SetOfNonNullableObjects { get; }
    // public ISet<Dog>? NullableSetOfObjects { get; }  // Compile-time error
    // public ISet<Dog?> SetOfNullableObjects { get; } // Compile-time error

    public IDictionary<string, Dog?> DictionaryOfNullableObjects { get; }
    // public IDictionary<string, Dog> DictionaryOfNonNullableObjects { get; } // Compile-time error
    // public IDictionary<string, Dog>? NullableDictionaryOfObjects { get; } // Compile-time error

    [Backlink(nameof(Dog.Person))]
    public IQueryable<Dog> MyDogs { get; }

    // [Backlink(nameof(Dog.People))]
    // public IQueryable<Dog?> MyDogs { get; } // Compile-time error
}

