var mongoClient = new MongoClient("<connection string URI>");

var dbContextOptions =
    new DbContextOptionsBuilder<MyDbContext>()
        .UseMongoDB(mongoClient, "sample_guides")
        .LogTo(Console.WriteLine)
        .EnableSensitiveDataLogging()
        .Options;

var db = new MyDbContext(dbContextOptions);
