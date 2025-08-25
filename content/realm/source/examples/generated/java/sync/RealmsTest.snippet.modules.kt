// A library must create a module and set library = true. This will prevent the default
// module from being created.
// allClasses = true can be used instead of listing all classes in the library.
@RealmModule(library = true, allClasses = true)
class MyLibraryModule

// ...

// Library projects are therefore required to explicitly set their own module.
val libraryConfig =
    SyncConfiguration.Builder(app.currentUser(), LIBRARY_PARTITION)
        .modules(MyLibraryModule())
        .build()

// Apps can add the library RealmModule to their own schema.
val config =
    SyncConfiguration.Builder(app.currentUser(), PARTITION)
        .modules(Realm.getDefaultModule(), MyLibraryModule())
        .build()
