var orders = aggDB.GetCollection<Order>("orders");

orders.InsertMany(new List<Order>
{
    new Order
    {
        CustomerId = "elise_smith@myemail.com",
        OrderDate = DateTime.Parse("2020-05-30T08:35:52Z"),
        Value = 231
    },
    new Order
    {
        CustomerId = "elise_smith@myemail.com",
        OrderDate = DateTime.Parse("2020-01-13T09:32:07Z"),
        Value = 99
    },
    new Order
    {
        CustomerId = "oranieri@warmmail.com",
        OrderDate = DateTime.Parse("2020-01-01T08:25:37Z"),
        Value = 63
    },
    new Order
    {
        CustomerId = "tj@wheresmyemail.com",
        OrderDate = DateTime.Parse("2019-05-28T19:13:32Z"),
        Value = 2
    },
    new Order
    {
        CustomerId = "tj@wheresmyemail.com",
        OrderDate = DateTime.Parse("2020-11-23T22:56:53Z"),
        Value = 187
    },
    new Order
    {
        CustomerId = "tj@wheresmyemail.com",
        OrderDate = DateTime.Parse("2020-08-18T23:04:48Z"),
        Value = 4
    },
    new Order
    {
        CustomerId = "elise_smith@myemail.com",
        OrderDate = DateTime.Parse("2020-12-26T08:55:46Z"),
        Value = 4
    },
    new Order
    {
        CustomerId = "tj@wheresmyemail.com",
        OrderDate = DateTime.Parse("2021-02-28T07:49:32Z"),
        Value = 1024
    },
    new Order
    {
        CustomerId = "elise_smith@myemail.com",
        OrderDate = DateTime.Parse("2020-10-03T13:49:44Z"),
        Value = 102
    }
});
