var orders = aggDB.GetCollection<Order>("orders");

orders.InsertMany(new List<Order>
{
    new Order
    {
        OrderId = 6363763262239L,
        Products = new List<Product>
        {
            new Product
            {
                ProductId = "abc12345",
                Name = "Asus Laptop",
                Price = 431
            },
            new Product
            {
                ProductId = "def45678",
                Name = "Karcher Hose Set",
                Price = 22
            }
        }
    },
    new Order
    {
        OrderId = 1197372932325L,
        Products = new List<Product>
        {
            new Product
            {
                ProductId = "abc12345",
                Name = "Asus Laptop",
                Price = 429
            }
        }
    },
    new Order
    {
        OrderId = 9812343774839L,
        Products = new List<Product>
        {
            new Product
            {
                ProductId = "pqr88223",
                Name = "Morphy Richards Food Mixer",
                Price = 431
            },
            new Product
            {
                ProductId = "def45678",
                Name = "Karcher Hose Set",
                Price = 21
            }
        }
    },
    new Order
    {
        OrderId = 4433997244387L,
        Products = new List<Product>
        {
            new Product
            {
                ProductId = "def45678",
                Name = "Karcher Hose Set",
                Price = 23
            },
            new Product
            {
                ProductId = "jkl77336",
                Name = "Picky Pencil Sharpener",
                Price = 1
            },
            new Product
            {
                ProductId = "xyz11228",
                Name = "Russell Hobbs Chrome Kettle",
                Price = 16
            }
        }
    }
});
