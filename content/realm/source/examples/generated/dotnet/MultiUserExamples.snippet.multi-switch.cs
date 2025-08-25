app.SwitchUser(aimee);
Assert.IsTrue(aimee.Id == app.CurrentUser.Id, "aimee is current user");
