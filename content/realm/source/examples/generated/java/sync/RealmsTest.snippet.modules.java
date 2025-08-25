// A library must create a module and set library = true. This will prevent the default
// module from being created.
// allClasses = true can be used instead of listing all classes in the library.
@RealmModule(library = true, allClasses = true)
public class MyLibraryModule {}

// ...

// Library projects are therefore required to explicitly set their own module.
SyncConfiguration libraryConfig = new SyncConfiguration.Builder(app.currentUser(), LIBRARY_PARTITION)
        .modules(new MyLibraryModule())
        .build();

// Apps can add the library RealmModule to their own schema.
SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
        .modules(Realm.getDefaultModule(), new MyLibraryModule())
        .build();
