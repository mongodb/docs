Realm.logger.setLogLevel(LogLevel.off);
await executeAppCode();

Realm.logger.setLogLevel(LogLevel.debug, category: LogCategory.realm);
await executeComplexCodeToDebug();
