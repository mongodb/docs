var dictionary = container.IntDictionary.AsRealmCollection();

dictionary.CollectionChanged += (sender, e) =>
{
    Console.WriteLine($"Collection {sender} changed: {e.Action}");
};

dictionary.PropertyChanged += (sender, e) =>
{
    Console.WriteLine($"Property changed on {sender}: {e.PropertyName}");
};
