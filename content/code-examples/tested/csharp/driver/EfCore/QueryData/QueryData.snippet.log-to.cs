var mongoClient = new MongoClient("<connection string URI>");

var dbContextOptions =
    new DbContextOptionsBuilder<MyDbContext>()
        .UseMongoDB(mongoClient, "sample_guides")
        .LogTo(Console.WriteLine)
        .Options;

var db = new MyDbContext(dbContextOptions);
