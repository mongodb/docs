await app.RemoveUserAsync(elvis);
var noMoreElvis = app.AllUsers.FirstOrDefault(u => u.Id == elvis.Id);
Assert.IsNull(noMoreElvis);
Console.WriteLine("Elvis has left the application.");
