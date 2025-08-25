using System;
using NUnit.Framework;
using Realms;
using Realms.Schema;
using static Realms.Schema.ObjectSchema;

namespace Examples
{
    public class Schemas
    {
        public Schemas()
        {
        }

        [Test]
        public void TestSchemas()
        {
            // :snippet-start: schema_property
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
            // :snippet-end:

            Assert.AreEqual(2, config.Schema.Count);
            Assert.AreEqual(1, manualConfig.Schema.Count);
            Assert.AreEqual(1, mixedConfig.Schema.Count);
        }
    }

    class ClassA : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public string Id { get; set; }
    }
    class ClassB : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public string Id { get; set; }
    }
}
