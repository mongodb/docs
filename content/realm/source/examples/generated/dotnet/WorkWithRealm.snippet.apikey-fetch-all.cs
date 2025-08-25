var allKeys = await user.ApiKeys.FetchAllAsync();
foreach (var key in allKeys)
{
    Console.WriteLine($"I fetched the key named {key.Name}. " +
        $"Is it enabled? {key.IsEnabled}");
}
