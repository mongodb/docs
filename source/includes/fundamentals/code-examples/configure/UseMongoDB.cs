var mongoClient = new MongoClient("<Your MongoDB Connection URI>");

var dbContextOptions =
    new DbContextOptionsBuilder<MyDbContext>().UseMongoDB(mongoClient, "<Database Name");

var db = new MyDbContext(dbContextOptions.Options);
db.Database.EnsureCreated();