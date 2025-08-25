var dog = realm.All<Dog>().First();
realm.WriteAsync(() =>
{
    dog.Name = "Wolfie";
    dog.Age += 1;
});
