final currentUser = await app.logIn(credentials);
final config = Configuration.flexibleSync(currentUser, [Tricycle.schema],
    path: 'flex.realm');
final realm = Realm(config);
