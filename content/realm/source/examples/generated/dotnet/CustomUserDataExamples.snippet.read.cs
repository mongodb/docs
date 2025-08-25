await user.RefreshCustomDataAsync();

// Tip: define a class that represents the custom data
// and use the gerneic overload of GetCustomData<>()
var customUserData = user.GetCustomData<CustomUserData>();

Console.WriteLine($"User has pets: {customUserData.HasPets}");
Console.WriteLine($"User's favorite color is {customUserData.FavoriteColor}");
Console.WriteLine($"User's timezone is {customUserData.LocalTimeZone}");
