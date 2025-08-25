var stringSet = container.StringSet.AsRealmCollection();

stringSet.CollectionChanged += (sender, e) =>
{
    Console.WriteLine($"Set {sender} changed: {e.Action}");
};

stringSet.PropertyChanged += (sender, e) =>
{
    Console.WriteLine($"Property changed on {sender}: {e.PropertyName}");
};
