await foreach (var restaurant in query.ToAsyncEnumerable())
{
    Console.WriteLine(restaurant.ToJson());
}
