user = await app.LogInAsync(
    Credentials.EmailPassword("caleb@mongodb.com", "MySekritPwd"));
config = new PartitionSyncConfiguration("myPart", user);
try
{
    realm = await Realm.GetInstanceAsync(config);
}
catch (Exception ex)
{
    Console.WriteLine($@"Error creating or opening the
        realm file. {ex.Message}");
}
