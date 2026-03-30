var mongoClient = new MongoClient("<Your MongoDB Connection URI>");

var dbContextOptions =
    new DbContextOptionsBuilder<MyDbContext>().UseMongoDB(mongoClient, "<database name>");

var db = new MyDbContext(dbContextOptions.Options);
