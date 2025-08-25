final config = Configuration.local([Car.schema],
    fifoFilesFallbackPath: "./fifo_folder");
final realm = Realm(config);
