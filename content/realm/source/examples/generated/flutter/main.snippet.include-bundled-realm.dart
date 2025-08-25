// Also import Realm schema and Flutter widgets
import 'package:flutter/services.dart';
import 'package:realm/realm.dart';
import 'dart:io';

Future<Realm> initBundledRealm(String assetKey) async {
  final config = Configuration.local([Car.schema]);
  final file = File(config.path);
  if (!await file.exists()) {
    final realmBytes = await rootBundle.load(assetKey);
    await file.writeAsBytes(
        realmBytes.buffer
            .asUint8List(realmBytes.offsetInBytes, realmBytes.lengthInBytes),
        mode: FileMode.write);
  }
  return Realm(config);
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final realm = await initBundledRealm("assets/bundle.realm");
  runApp(const MyApp());
}
