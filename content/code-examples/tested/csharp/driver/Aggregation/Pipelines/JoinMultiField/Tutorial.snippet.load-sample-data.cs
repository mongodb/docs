var orders = aggDB.GetCollection<Order>("orders");
var products = aggDB.GetCollection<Product>("products");

products.InsertMany(new List<Product>
{
    new Product()
    {
        Name = "Asus Laptop",
        Variation = "Ultra HD",
        Category = "ELECTRONICS",
        Description = "Great for watching movies"
    },
    new Product()
    {
        Name = "Asus Laptop",
        Variation = "Standard Display",
        Category = "ELECTRONICS",
        Description = "Good value laptop for students"
    },
    new Product()
    {
        Name = "The Day Of The Triffids",
        Variation = "1st Edition",
        Category = "BOOKS",
        Description = "Classic post-apocalyptic novel"
    },
    new Product()
    {
        Name = "The Day Of The Triffids",
        Variation = "2nd Edition",
        Category = "BOOKS",
        Description = "Classic post-apocalyptic novel"
    },
    new Product()
    {
        Name = "Morphy Richards Food Mixer",
        Variation = "Deluxe",
        Category = "KITCHENWARE",
        Description = "Luxury mixer turning good cakes into great"
    }
});

orders.InsertMany(new List<Order>
{
    new Order()
    {
        CustomerId = "elise_smith@myemail.com",
        OrderDate = DateTime.Parse("2020-05-30T08:35:52Z"),
        ProductName = "Asus Laptop",
        ProductVariation = "Standard Display",
        Value = 431.43
    },
    new Order()
    {
        CustomerId = "tj@wheresmyemail.com",
        OrderDate = DateTime.Parse("2019-05-28T19:13:32Z"),
        ProductName = "The Day Of The Triffids",
        ProductVariation = "2nd Edition",
        Value = 5.01
    },
    new Order()
    {
        CustomerId = "oranieri@warmmail.com",
        OrderDate = DateTime.Parse("2020-01-01T08:25:37Z"),
        ProductName = "Morphy Richards Food Mixer",
        ProductVariation = "Deluxe",
        Value = 63.13
    },
    new Order()
    {
        CustomerId = "jjones@tepidmail.com",
        OrderDate = DateTime.Parse("2020-12-26T08:55:46Z"),
        ProductName = "Asus Laptop",
        ProductVariation = "Standard Display",
        Value = 429.65
    }
});
