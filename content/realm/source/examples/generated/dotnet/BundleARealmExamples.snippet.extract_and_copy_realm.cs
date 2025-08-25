// If you are using a local realm
var config = RealmConfiguration.DefaultConfiguration;

// If the realm file is a synced realm
var app = App.Create(Config.AppId);
var user = await app.LogInAsync(Credentials.Anonymous());
config = new PartitionSyncConfiguration("myPartition", user);

// Extract and copy the realm
if (!File.Exists(config.DatabasePath))
{
    using var bundledDbStream = Assembly.GetExecutingAssembly()
        .GetManifestResourceStream("bundled.realm");
    using var databaseFile = File.Create(config.DatabasePath);
    bundledDbStream!.CopyTo(databaseFile);
}

// Open the Realm:
var realm = Realm.GetInstance(config);
