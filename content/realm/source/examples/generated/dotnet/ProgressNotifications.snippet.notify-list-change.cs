var list = container.StringList.AsRealmCollection();

list.CollectionChanged += (sender, e) =>
{
    Console.WriteLine($"List {sender} changed: {e.Action}");
};

list.PropertyChanged += (sender, e) =>
{
    Console.WriteLine($"Property changed on {sender}: {e.PropertyName}");
};
