var updateResult = await userDataCollection.UpdateOneAsync(
    new BsonDocument("_id", user.Id),
    new BsonDocument("$set", new BsonDocument("HasPets", false)));

await user.RefreshCustomDataAsync();
var customUserData = user.GetCustomData<CustomUserData>();

Console.WriteLine($"User has pets: {customUserData.HasPets}");
Console.WriteLine($"User's favorite color is {customUserData.FavoriteColor}");
Console.WriteLine($"User's timezone is {customUserData.LocalTimeZone}");
