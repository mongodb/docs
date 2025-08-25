public class Migration implements RealmMigration {
  @Override
  public void migrate(DynamicRealm realm, long oldVersion, long newVersion) {
     Long version = oldVersion;

     // DynamicRealm exposes an editable schema
     RealmSchema schema = realm.getSchema();

     // Changes from version 0 to 1: Adding lastName.
     // All properties will be initialized with the default value "".
     if (version == 0L) {
        schema.get("Person")
            .addField("lastName", String.class, FieldAttribute.REQUIRED);
        version++;
     }

     // Changes from version 1 to 2: combine firstName/lastName into fullName
     if (version == 1L) {
        schema.get("Person")
            .addField("fullName", String.class, FieldAttribute.REQUIRED)
            .transform( DynamicRealmObject obj -> {
                String name = "${obj.getString("firstName")} ${obj.getString("lastName")}";
                obj.setString("fullName", name);
            })
            .removeField("firstName")
            .removeField("lastName");
        version++;
     }

     // Changes from version 2 to 3: replace age with birthday
     if (version == 2L) {
        schema.get("Person")
            .addField("birthday", Date::class.java, FieldAttribute.REQUIRED)
            .transform(DynamicRealmObject obj -> {
                Int birthYear = Date().year - obj.getInt("age");
                obj.setDate("birthday", Date(birthYear, 1, 1));
            })
            .removeField("age");
        version++;
     }
  }
};

@RealmModule(classes = { Person.class })
public class Module {}

RealmConfiguration config = new RealmConfiguration.Builder()
    .modules(new Module())
    .schemaVersion(3) // Must be bumped when the schema changes
    .migration(new Migration()) // Migration to run instead of throwing an exception
    .build();
