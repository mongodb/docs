// Set an instance of a custom logger
val myCustomLogger = MyLogger()
RealmLog.add(myCustomLogger)

// You can remove a specific logger
RealmLog.remove(myCustomLogger)

// Or remove all loggers, including the default system logger
RealmLog.removeAll()
