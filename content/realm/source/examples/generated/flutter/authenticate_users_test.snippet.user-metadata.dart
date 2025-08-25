final user = await app.logIn(
    Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd"));

final emailAddress = user.profile.email;
print(emailAddress); // prints 'lisa@example.com'
