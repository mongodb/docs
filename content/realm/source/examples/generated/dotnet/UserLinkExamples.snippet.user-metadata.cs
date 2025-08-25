var user = await app.LogInAsync(
    Credentials.EmailPassword("user1@example.com", "p@ssw0rd"));
Console.WriteLine($"The user's email is {user.Profile.Email}");
