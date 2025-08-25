// After copying the above created file to the project folder,
// we can access it in Application.dataPath

// If you are using a local realm
var config = RealmConfiguration.DefaultConfiguration;

// If the realm is synced realm
var app = App.Create("myRealmAppId");
var user = await app.LogInAsync(Credentials.Anonymous());
config = new PartitionSyncConfiguration("myPartition", user);

if (!File.Exists(config.DatabasePath))
    FileUtil.CopyFileOrDirectory(Path.Combine(Application.dataPath,
        "bundled.realm"), config.DatabasePath);
}

var realm = Realm.GetInstance(config);
