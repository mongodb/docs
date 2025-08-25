import 'package:realm_dart/realm.dart';
import 'package:test/test.dart';

const APP_ID = "example-testers-kvjdy";
main() {
  late App app;
  late EmailPasswordAuthProvider authProvider;
  setUpAll(() async {
    app = App(AppConfiguration(APP_ID));
    authProvider = EmailPasswordAuthProvider(app);
    final email = "lisa@example.com";
    final password = "myStr0ngPassw0rd";
    try {
      await authProvider.registerUser(email, password);
    } catch (err) {
      print(err);
    }
    await app.logIn(Credentials.emailPassword(email, password));
  });
  tearDownAll(() async {
    if (app.currentUser != null) {
      await app.currentUser?.logOut();
    }
  });
  group("Atlas Functions tests", () {
    test("Basic Function usage", () async {
      final user = app.currentUser!;
      // :snippet-start: call-function
      final response = await user.functions.call("addition", [1, 2]);

      // convert EJSON response to Dart number
      print(response);
      final responseAsNum = num.tryParse(response["\$numberDouble"]);

      prints(responseAsNum); // prints 3
      // :snippet-end:
      expect(responseAsNum, 3);
    });
  });
}
