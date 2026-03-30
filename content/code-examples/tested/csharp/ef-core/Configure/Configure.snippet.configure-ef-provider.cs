var mongoClient = new MongoClient("<Your MongoDB Connection URI>");

var dbContextOptions =
    new DbContextOptionsBuilder<MyDbContext>().UseMongoDB(mongoClient, "<database name>");

var db = new MyDbContext(dbContextOptions.Options);

// Add a new customer and save it to the database
db.Customers.Add(new Customer() { Name = "John Doe", Order = "1 Green Tea" });
db.SaveChanges();
