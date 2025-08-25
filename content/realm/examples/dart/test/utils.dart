
import 'package:realm_dart/realm.dart';
import 'dart:math';

Future<void> cleanUpRealm(Realm realm, [App? app]) async {
  await app?.currentUser?.logOut();
  if (!realm.isClosed) {
    realm.close();
  }
  await delay(1000);
  Realm.deleteRealm(realm.config.path);
}

final random = Random();
String generateRandomString(int len) {
  const chars = 'abcdefghjklmnopqrstuvwxuz';
  return List.generate(len, (index) => chars[random.nextInt(chars.length)])
      .join();
}

Future delay(duration) async {
  await Future.delayed(Duration(milliseconds: duration));
}
