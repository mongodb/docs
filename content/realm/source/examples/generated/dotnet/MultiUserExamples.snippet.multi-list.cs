foreach (var user in app.AllUsers)
{
    Console.WriteLine($"User {user.Id} is logged on via {user.Provider}");
}
Assert.AreEqual(2, app.AllUsers.Count());
