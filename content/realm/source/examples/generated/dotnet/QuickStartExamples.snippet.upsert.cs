var id = ObjectId.GenerateNewId();

var item1 = new Item
{
    Id = id,
    Name = "Defibrillate the Master Oscillator",
    Assignee = "Aimee"
};

// Add a new person to the realm. Since nobody with the existing Id
// has been added yet, this person is added.
await realm.WriteAsync(() =>
{
    realm.Add(item1, update: true);
});

var item2 = new Item
{
    Id = id,
    Name = "Fluxify the Turbo Encabulator",
    Assignee = "Aimee"
};

// Based on the unique Id field, we have an existing person,
// but with a different name. When `update` is true, you overwrite
// the original entry.
await realm.WriteAsync(() =>
{
    realm.Add(item2, update: true);
});
// item1 now has a Name of "Fluxify the Turbo Encabulator"
// and item2 was not added as a new Item in the collection.
