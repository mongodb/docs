// By default, all loaded RealmObject classes are included.
// Use the RealmConfiguration when you want to 
// construct a schema for only specific C# classes:
var config = new RealmConfiguration
{
    Schema = new[] { typeof(ClassA), typeof(ClassB) }
};

// More advanced: construct the schema manually
var manualConfig = new RealmConfiguration
{
    Schema = new RealmSchema.Builder
    {
        new Builder("ClassA", ObjectType.EmbeddedObject)
        {
            Property.Primitive("Id",
                RealmValueType.Guid,
                isPrimaryKey: true),
            Property.Primitive("LastName",
                RealmValueType.String,
                isNullable: true,
                indexType: IndexType.General)
        }
    }
};

// Most advanced: mix and match
var mixedSchema = new ObjectSchema.Builder(typeof(ClassA));
mixedSchema.Add(Property.FromType<int>("ThisIsNotInTheCSharpClass"));
// `mixedSchema` now has all of the properties of the ClassA class
// and an extra integer property called "ThisIsNotInTheCSharpClass"

var mixedConfig = new RealmConfiguration
{
    Schema = new[] { mixedSchema.Build() }
};
