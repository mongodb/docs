import 'package:realm/realm.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  late App app;

  setUp(() async {
    app = App(AppConfiguration(TEST_APP_ID));
    await app.logIn(Credentials.anonymous());
  });

  // Delete and log current user out
  tearDown(() async {
    app.deleteUser(app.currentUser!);
    await app.currentUser?.logOut();
  });

  test("Check user type", () {
    final user = app.currentUser!;
    expect(user.identities[0].provider, AuthProviderType.anonymous);
  });
}
