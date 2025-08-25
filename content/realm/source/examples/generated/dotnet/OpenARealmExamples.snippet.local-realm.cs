var config = new RealmConfiguration(pathToDb + "my.realm")
{
    IsReadOnly = true,
};
Realm localRealm;
try
{
    localRealm = Realm.GetInstance(config);
}
catch (RealmFileAccessErrorException ex)
{
    Console.WriteLine($@"Error creating or opening the
        realm file. {ex.Message}");
}
