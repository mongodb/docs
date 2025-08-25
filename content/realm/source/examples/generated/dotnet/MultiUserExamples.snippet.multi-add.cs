var aimee = await app.LogInAsync(Credentials.EmailPassword(
    "aimee@example.com", "sekrit"));
Assert.IsTrue(aimee.Id == app.CurrentUser.Id, "aimee is current user");

var elvis = await app.LogInAsync(Credentials.EmailPassword(
    "elvis@example.com", "sekrit2"));
Assert.IsTrue(elvis.Id == app.CurrentUser.Id, "elvis is current user");
