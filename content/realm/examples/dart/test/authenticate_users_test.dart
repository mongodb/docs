import 'dart:async';
import 'dart:convert';
import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:faker/faker.dart';
import './utils.dart';

const APP_ID = "example-testers-kvjdy";

void main() {
  late App app;
  late EmailPasswordAuthProvider authProvider;
  setUpAll(() async {
    app = App(AppConfiguration(APP_ID));
    authProvider = EmailPasswordAuthProvider(app);
    try {
      await authProvider.registerUser("lisa@example.com", "myStr0ngPassw0rd");
    } catch (err) {
      print(err);
    }
    try {
      await authProvider.registerUser("bart@example.com", "myStr0ngPassw0rd");
    } catch (err) {
      print(err);
    }
  });
  tearDown(() async {
    if (app.currentUser != null) {
      await app.currentUser?.logOut();
    }
  });

  group('Log in user - ', () {
    test("Anonymous user", () async {
      // :snippet-start: anonymous-credentials
      final anonCredentials = Credentials.anonymous();
      await app.logIn(anonCredentials);
      // :snippet-end:
      expect(app.currentUser != null, true);
      expect(anonCredentials.provider, AuthProviderType.anonymous);
    });
    test("Multiple anonymous users", () async {
      // :snippet-start: multiple-anonymous-credentials
      final anonUser = await app.logIn(Credentials.anonymous());

      final otherAnonUser =
          await app.logIn(Credentials.anonymous(reuseCredentials: false));
      // :snippet-end:
      expect(anonUser.id == otherAnonUser.id, false);
      // clean up
      await app.deleteUser(anonUser);
      await app.deleteUser(otherAnonUser);
    });
    test("Email/password user", () async {
      // :snippet-start: email-password-credentials
      final emailPwCredentials =
          Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd");
      await app.logIn(emailPwCredentials);
      // :snippet-end:
      expect(app.currentUser != null, true);
      expect(emailPwCredentials.provider, AuthProviderType.emailPassword);
    });
    test("Custom JWT user", () async {
      Future<String> authenticateWithExternalSystem() async {
        final faker = Faker();
        // Create a json web token
        final jwt = JWT(
          {
            "aud": APP_ID,
            "sub": faker.internet.userName(),
            "name": faker.person.name(),
            "iat": DateTime.now().millisecondsSinceEpoch,
            "exp": DateTime.now().millisecondsSinceEpoch * 2,
          },
        );
        final token = jwt.sign(
          SecretKey(
              'E7DE0D13D66BF64EC9A9A74A3D600E840D39B4C12832D380E48ECE02070865AB'),
        );
        return token;
      }

      // :snippet-start: custom-jwt-credentials
      final token = await authenticateWithExternalSystem();
      final jwtCredentials = Credentials.jwt(token);
      final currentUser = await app.logIn(jwtCredentials);
      // :snippet-end:

      expect(currentUser.identities[0].provider, AuthProviderType.jwt);
      // clean up
      app.deleteUser(currentUser);
    });
    test("Custom Function user", () async {
      // :snippet-start: custom-function-credentials
      final credentials = {
        "username": "someUsername",
      };
      // payload must be a JSON-encoded string
      final payload = jsonEncode(credentials);

      final customCredentials = Credentials.function(payload);
      final currentUser = await app.logIn(customCredentials);
      // :snippet-end:
      expect(currentUser.identities[0].provider, AuthProviderType.function);
      // clean up
      app.deleteUser(currentUser);
    });
    test("Facebook user", () async {
      final accessToken = 'abc';
      // :snippet-start: facebook-credentials
      final facebookCredentials = Credentials.facebook(accessToken);
      final currentUser = await app.logIn(facebookCredentials);
      // :snippet-end:
    }, skip: 'not testing 3rd party auth');
    test("Google user (auth code)", () async {
      final authCode = 'abc';
      // :snippet-start: google-auth-code-credentials
      final googleAuthCodeCredentials = Credentials.googleAuthCode(authCode);
      final currentUser = await app.logIn(googleAuthCodeCredentials);
      // :snippet-end:
    }, skip: 'not testing 3rd party auth');
    test("Google user (ID token)", () async {
      final idToken = 'abc';
      // :snippet-start: google-id-token-credentials
      final googleIdTokenCredentials = Credentials.googleIdToken(idToken);
      final currentUser = await app.logIn(googleIdTokenCredentials);
      // :snippet-end:
    }, skip: 'not testing 3rd party auth');
    test("Apple user", () async {
      final idToken = 'abc';
      // :snippet-start: apple-credentials
      final appleCredentials = Credentials.apple(idToken);
      final currentUser = await app.logIn(appleCredentials);
      // :snippet-end:
    }, skip: 'not testing 3rd party auth');
  });
  test("Log out user", () async {
    final anonCredentials = Credentials.anonymous();
    final user = await app.logIn(anonCredentials);
    // :snippet-start: log-out
    await user.logOut();
    // :snippet-end:
    expect(app.currentUser, null);
  });
  test("Retrieve current user", () async {
    final anonCredentials = Credentials.anonymous();
    await app.logIn(anonCredentials);
    // :snippet-start: retrieve-current-user
    final user = app.currentUser;
    // :snippet-end:
    expect(app.currentUser?.id.isNotEmpty, true);
  });
  group("Email password users", () {
    test("Register a user", () async {
      // :snippet-start: register-user
      EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
      await authProvider.registerUser("lisa@example.com", "myStr0ngPassw0rd");
      // :snippet-end:
    });

    group('Email confirmation', () {
      test("Send confirmation email", () async {
        const token = '';
        const tokenId = '';
        // :snippet-start: send-confirmation-email
        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.confirmUser(token, tokenId);
        // :snippet-end:
      });
      test("Retry user confirmation function", () async {
        // :snippet-start: retry-user-confirmation-function
        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.retryCustomConfirmationFunction("lisa@example.com");
        // :snippet-end:
      });
      test("Retry user confirmation email", () async {
        // :snippet-start: retry-user-confirmation-email
        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.resendUserConfirmation("lisa@example.com");
        // :snippet-end:
      });
    });

    group('Password reset', () {
      test("Call a password reset function - expect success", () async {
        // :snippet-start: password-reset-function-success
        // The password reset function takes any number of
        // arguments. You might ask the user to provide answers to
        // security questions, for example, to verify the user
        // should be able to complete the password reset.
        final args = [
          "Snowball II",
          "Springfield Elementary School",
          "Bouvier"
        ];

        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.callResetPasswordFunction(
            "lisa@example.com", "n3wSt0ngP4ssw0rd!",
            functionArgs: args);
        // :snippet-end:
      });
      test("Call a password reset function - expect pending", () async {
        // :snippet-start: password-reset-function-pending
        // The password reset function takes any number of
        // arguments.
        final args = [];

        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.callResetPasswordFunction(
            "lisa@example.com", "n3wSt0ngP4ssw0rd!",
            functionArgs: args);

        // ... Later...

        // Token and tokenId are parameters you can access
        // in the App Services function context. You could send
        // this to the user via email, SMS, or some other method.
        final token = "someToken";
        final tokenId = "someTokenId";

        await authProvider.completeResetPassword(
            "n3wSt0ngP4ssw0rd!", token, tokenId);
        // :snippet-end:
      });
      test("Send a password reset email", () async {
        // :snippet-start: password-reset-email
        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.resetPassword("lisa@example.com");
        // :snippet-end:
      });
      test('Confirm password reset email', () async {
        const token = '';
        const tokenId = '';
        // :snippet-start: password-reset-email-confirmation
        EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
        await authProvider.completeResetPassword(
            "n3wSt0ngP4ssw0rd!", token, tokenId);
        // :snippet-end:
      });
    });
  }, skip: 'Skipping because requires user interaction/email');
  group("API Key Users - ", () {
    setUp(() async {
      final currentUser = await app.logIn(
          Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd"));
      final apiKeys = await currentUser.apiKeys.fetchAll();
      for (ApiKey key in apiKeys) {
        await currentUser.apiKeys.delete(key.id);
      }
      final apiKeysAfter = await currentUser.apiKeys.fetchAll();
    });
    tearDown(() async {
      final currentUser = await app.logIn(
          Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd"));
      final apiKeys = await currentUser.apiKeys.fetchAll();
      for (ApiKey key in apiKeys) {
        await currentUser.apiKeys.delete(key.id);
      }
      await currentUser.logOut();
    });
    test("Login with API key", () async {
      final user = app.currentUser!;
      final userId = user.id;
      final apiKey = await user.apiKeys.create('myApiKey');
      final myApiKey = apiKey.value!;
      // :snippet-start: api-key-auth
      final apiKeyCredentials = Credentials.apiKey(myApiKey);
      final apiKeyUser = await app.logIn(apiKeyCredentials);
      // :snippet-end:
      expect(userId, apiKeyUser.id);
    });
    test("Work with user API keys", () async {
      final user = app.currentUser!;
      // :snippet-start: work-with-api-keys
      // Create user API key
      final apiKey = await user.apiKeys.create("api-key-name");
      expect(apiKey.id.runtimeType, ObjectId); // :remove:

      // Get existing user API key by ID
      // Returns `null` if no existing API key for the ID
      final refetchedApiKey = await user.apiKeys.fetch(apiKey.id);
      expect(refetchedApiKey.runtimeType, ApiKey); // :remove:

      // Get all API keys for a user
      final apiKeys = await user.apiKeys.fetchAll();
      expect(apiKeys.length, 1); // :remove:

      // Disable API key
      await user.apiKeys.disable(apiKey.id);
      expect(apiKey.isEnabled, false); // :remove:

      // Check if API key is enabled
      print(apiKey.isEnabled); // prints `false`

      // Enable API key
      await user.apiKeys.enable(apiKey.id);
      expect(apiKey.isEnabled, true); // :remove:

      // Delete a user API key
      final apiKeyId = apiKey.id; // :remove:
      await user.apiKeys.delete(apiKey.id);
      // :snippet-end:
      final noApiKey = await user.apiKeys.fetch(apiKeyId);
      expect(noApiKey, null);
    }, skip: "debuggin");
  });
  group('Work with multiple users', () {
    late User lisa;
    late User bart;
    setUpAll(() async {
      await app.logIn(Credentials.anonymous());
      lisa = await app.logIn(
          Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd"));
      bart = await app.logIn(
          Credentials.emailPassword("bart@example.com", "myStr0ngPassw0rd"));
    });
    tearDownAll(() async {
      for (User user in app.users) {
        await user.logOut();
      }
    });

    test('List all users on the device', () async {
      // :snippet-start: list-all-users
      final users = app.users;
      // :snippet-end:
      expect(users.length, 3);
    });
    test('Change the active user', () async {
      final otherUser = lisa;
      // :snippet-start: change-active-user
      app.switchUser(otherUser);
      // :snippet-end:
    });
    test('Remove a user from the device', () async {
      late User? user;
      if (app.currentUser != null) {
        user = app.currentUser;
        // :snippet-start: remove-user
        await app.removeUser(user!);
        // :snippet-end:
      }
    });
  });
  group('Link user credentials', () {
    test('Basic link user credentials', () async {
      final user = await app.logIn(Credentials.anonymous());
      final USERNAME = "${generateRandomString(20)}@example.com";
      final PASSWORD = generateRandomString(8);
      final authProvider = EmailPasswordAuthProvider(app);
      await authProvider.registerUser(USERNAME, PASSWORD);
      final additionalCredentials =
          Credentials.emailPassword(USERNAME, PASSWORD);
      // :snippet-start: link-user-credentials
      final linkedCredentialUser =
          await user.linkCredentials(additionalCredentials);
      // :snippet-end:
      expect(linkedCredentialUser.identities.length, 2);
    });
    test("Link user credentials example", () async {
      final USERNAME = "${generateRandomString(20)}@example.com";
      final PASSWORD = generateRandomString(8);
      // :snippet-start: link-user-credentials-example
      // on app start without registration
      final anonymousUser = await app.logIn(Credentials.anonymous());

      // ... user interacts with app

      //... user decides to sign up for app with email/password auth
      final authProvider = EmailPasswordAuthProvider(app);
      await authProvider.registerUser(USERNAME, PASSWORD);

      // link email/password credentials to anonymous user's credentials
      final linkedCredentialUser = await anonymousUser
          .linkCredentials(Credentials.emailPassword(USERNAME, PASSWORD));
      // :snippet-end:
      expect(linkedCredentialUser.identities.length, 2);
    });
  });

  // TODO: once custom user data functionality is expanded, refactor below tests
  // to have more info
  group('Custom user data', () {
    late User user;
    setUp(() async {
      user = await app.logIn(
          Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd"));
      final updatedTimestamp = DateTime.now().millisecondsSinceEpoch;
      final updatedCustomUserData = {
        "userId": user.id,
        "favoriteFood": "tuna tartare",
        "lastUpdated": updatedTimestamp
      };
      await user.functions.call("writeCustomUserData", [updatedCustomUserData]);
    });
    test('Read custom user data', () async {
      // :snippet-start: read-custom-user-data
      final customUserData = user.customData;
      // :snippet-end:
      expect(customUserData, isNotNull);
    });
    test('Refresh custom user data', () async {
      // :snippet-start: refresh-custom-user-data
      // refreshCustomData() returns the updated custom data object
      final updatedCustomData = await user.refreshCustomData();

      // Now when you access User.customData it's the value
      // returned from User.refreshCustomData()
      // :snippet-end:
      expect(updatedCustomData, user.customData);
    });

    test('Write custom user data from Atlas Function', () async {
      // :snippet-start: write-custom-user-data-function
      final user = app.currentUser!;
      final updatedTimestamp = DateTime.now().millisecondsSinceEpoch;
      final updatedCustomUserData = {
        "userId": user.id,
        "favoriteFood": "pizza",
        "lastUpdated": updatedTimestamp
      };

      final functionResponse = await user.functions
          .call("writeCustomUserData", [updatedCustomUserData]);

      // Contains the `updatedCustomUserData` object just added
      // in the above Atlas Function call
      final customUserData = await user.refreshCustomData();
      // :snippet-end:
      // expect(num.tryParse(functionResponse['matchedCount']['\$numberInt']), 1);
      expect(num.tryParse(functionResponse["modifiedCount"]['\$numberInt']), 1);
      expect(customUserData['userId'], user.id);
      expect(num.tryParse(customUserData["lastUpdated"]['\$numberLong']),
          updatedTimestamp);
    });
  });

  test('Delete user', () async {
    await authProvider.registerUser("moe@example.com", "myStr0ngPassw0rd");
    final credentials =
        Credentials.emailPassword("moe@example.com", "myStr0ngPassw0rd");
    await app.logIn(credentials);
    // :snippet-start: delete-user
    final currentUser = app.currentUser!;
    await app.deleteUser(currentUser);
    // :snippet-end:
    expect(app.currentUser, null);
  });
  test("Get user metadata", () async {
    // :snippet-start: user-metadata
    final user = await app.logIn(
        Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd"));

    final emailAddress = user.profile.email;
    print(emailAddress); // prints 'lisa@example.com'
    // :snippet-end:
    expect(emailAddress, 'lisa@example.com');
  });

  test('Listen for user state changes', () async {
    final user = await app.logIn(
        Credentials.emailPassword("lisa@example.com", "myStr0ngPassw0rd"));

    expect(user.state, UserState.loggedIn);

    final completer = Completer<UserChanges>();
    // :snippet-start: user-change-listener
    final userSubscription = user.changes.listen((changes) {
      changes.user; // the User being listened to
      completer.complete(changes); // :remove:
    });
    // :snippet-end:

    await user.logOut();
    expect(user.state, UserState.loggedOut);

    final changeEvent = await completer.future.timeout(Duration(seconds: 15));
    expect(changeEvent.user, user);
    expect(changeEvent.user.state, UserState.loggedOut);

    await userSubscription.cancel();
  });
}
