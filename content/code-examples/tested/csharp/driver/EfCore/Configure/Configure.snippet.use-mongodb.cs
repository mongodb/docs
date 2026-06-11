var mongoClient = new MongoClient("<connection string>");

var dbContextOptions =
    new DbContextOptionsBuilder<MyDbContext>().UseMongoDB(mongoClient, "<database name>");

var db = new MyDbContext(dbContextOptions.Options);
