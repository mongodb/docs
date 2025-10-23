var stocks = db.GetCollection<Stocks>("stocks");

stocks.InsertMany(new List<Stocks>
{
    new Stocks()
    {
        Ticker = "MDB",
        Date = DateTime.Parse("2021-12-18T15:59:00Z"),
        Close = 252.47,
        Volume = 55046.0
    },
    new Stocks()
    {
        Ticker = "MDB",
        Date = DateTime.Parse("2021-12-18T15:58:00Z"),
        Close = 252.94,
        Volume = 44042.0
    },
    new Stocks()
    {
        Ticker = "MDB",
        Date = DateTime.Parse("2021-12-18T15:57:00Z"),
        Close = 253.62,
        Volume = 40182.0
    },
    new Stocks()
    {
        Ticker = "MDB",
        Date = DateTime.Parse("2021-12-18T15:56:00Z"),
        Close = 253.63,
        Volume = 27890.0
    },
    new Stocks()
    {
        Ticker = "MDB",
        Date = DateTime.Parse("2021-12-18T15:55:00Z"),
        Close = 254.03,
        Volume = 40270.0
    }
});
