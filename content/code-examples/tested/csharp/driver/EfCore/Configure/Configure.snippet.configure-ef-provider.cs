var serviceCollection = new ServiceCollection();
serviceCollection.AddSingleton<IMongoClient>(
    new MongoClient("<connection string>"));

serviceCollection.AddDbContext<MyDbContext>((serviceProvider, options) =>
{
    var mongoClient = serviceProvider.GetRequiredService<IMongoClient>();
    options.UseMongoDB(mongoClient, "<database name>");
});

using var app = serviceCollection.BuildServiceProvider();
using (var scope = app.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MyDbContext>();

    // Add a new customer and save it to the database
    db.Customers.Add(new Customer() { Name = "John Doe", Order = "1 Green Tea" });
    db.SaveChanges();
}
