var newKey = await user.ApiKeys.CreateAsync("someKeyName");
Console.WriteLine($"I created a key named {newKey.Name}. " +
    $"Is it enabled? {newKey.IsEnabled}");
