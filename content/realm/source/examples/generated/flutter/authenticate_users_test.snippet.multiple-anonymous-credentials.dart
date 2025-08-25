final anonUser = await app.logIn(Credentials.anonymous());

final otherAnonUser =
    await app.logIn(Credentials.anonymous(reuseCredentials: false));
