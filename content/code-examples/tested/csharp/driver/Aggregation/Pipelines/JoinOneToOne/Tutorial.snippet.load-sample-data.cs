var orders = aggDB.GetCollection<Order>("orders");
var products = aggDB.GetCollection<Product>("products");

orders = aggDB.GetCollection<Order>("orders");
products = aggDB.GetCollection<Product>("products");

orders.InsertMany(new List<Order>
{
    new Order()
    {
        CustomerId = "elise_smith@myemail.com",
        OrderDate = DateTime.Parse("2020-05-30T08:35:52Z"),
        ProductId = "a1b2c3d4",
        Value = 431.43
    },
    new Order()
    {
        CustomerId = "tj@wheresmyemail.com",
        OrderDate = DateTime.Parse("2019-05-28T19:13:32Z"),
        ProductId = "z9y8x7w6",
        Value = 5.01
    },
    new Order()
    {
        CustomerId = "oranieri@warmmail.com",
        OrderDate = DateTime.Parse("2020-01-01T08:25:37Z"),
        ProductId = "ff11gg22hh33",
        Value = 63.13
    },
    new Order()
    {
        CustomerId = "jjones@tepidmail.com",
        OrderDate = DateTime.Parse("2020-12-26T08:55:46Z"),
        ProductId = "a1b2c3d4",
        Value = 429.65
    }
});

products.InsertMany(new List<Product>
{
    new Product()
    {
        Id = "a1b2c3d4",
        Name = "Asus Laptop",
        Category = "ELECTRONICS",
        Description = "Good value laptop for students"
    },
    new Product()
    {
        Id = "z9y8x7w6",
        Name = "The Day Of The Triffids",
        Category = "BOOKS",
        Description = "Classic post-apocalyptic novel"
    },
    new Product()
    {
        Id = "ff11gg22hh33",
        Name = "Morphy Richardds Food Mixer",
        Category = "KITCHENWARE",
        Description = "Luxury mixer turning good cakes into great"
    },
    new Product()
    {
        Id = "pqr678st",
        Name = "Karcher Hose Set",
        Category = "GARDEN",
        Description = "Hose + nozzles + winder for tidy storage"
    }
});
