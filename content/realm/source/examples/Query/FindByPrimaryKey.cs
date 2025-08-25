// Object to be stored in the Realm instance
var myTask = new Task
{
    Id = 1
};

realm.Write(() =>
{
    realm.Add(myTask);
});

// Other code...

// Find specific object by primary key
var obj = realm.Find<Task>(1);
