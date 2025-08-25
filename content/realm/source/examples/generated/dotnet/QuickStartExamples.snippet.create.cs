var testItem = new Item
{
    Name = "Do this thing",
    Status = ItemStatus.Open.ToString(),
    Assignee = "Aimee"
};

await realm.WriteAsync(() =>
{
    realm.Add(testItem);
});

// Or 

var testItem2 =
    await realm.WriteAsync(() =>
    {
        return realm.Add<Item>(new Item
        {
            Name = "Do this thing, too",
            Status = ItemStatus.InProgress.ToString(),
            Assignee = "Satya"
        });
    }
);

