app = App.Create(myRealmAppId);
user = await app.LogInAsync(Credentials.Anonymous());

mongoClient = user.GetMongoClient("mongodb-atlas");
dbTracker = mongoClient.GetDatabase("tracker");
userDataCollection = dbTracker.GetCollection<CustomUserData>("user_data");

var cud = new CustomUserData(user.Id)
{
    FavoriteColor = "pink",
    LocalTimeZone = "+8",
    HasPets = true
};

var insertResult = await userDataCollection.InsertOneAsync(cud);
