import 'package:test/test.dart';
import 'dart:async';
import 'package:realm_dart/realm.dart';
import './utils.dart';
import 'schemas.dart';

void main() {
  test('Set log level and customize logger', () async {
    final stringBuffer = StringBuffer();

    // :snippet-start: set-the-log-level
    // If no category is set, default is LogCategory.realm
    Realm.logger.setLogLevel(LogLevel.all, category: LogCategory.realm);
    // :snippet-end:

    // Customize logging behavior
    // :snippet-start: set-custom-logger
    Realm.logger.onRecord.listen((record) {
      // Do something with the log record
      // :uncomment-start:
      // print(record.message);
      // :uncomment-end:
      // :remove-start:
      // For testing
      stringBuffer
          .writeln('${record.category} ${record.level}: ${record.message}');
      // :remove-end:
    });
    // :snippet-end:

    final config = Configuration.local([Person.schema]);
    final realm = Realm(config);

    realm.write(() => realm.add(Person(ObjectId(), 'Anakin', 'Skywalker')));

    // Hack to wait for stream to process
    await delay(200);

    final logs = stringBuffer.toString();

    // Expect logs to contain a substring that includes the field and value
    // we set earlier
    expect(logs.contains('Set \'firstName\' to "Anakin"'), isTrue);

    Future executeAppCode() async {
      // Capture log length before new write transaction
      final oldStringBufferLength = stringBuffer.length;

      realm.write(() => realm.add(Person(ObjectId(), 'Leia', 'Organa')));

      // Hack to wait for stream to process
      await delay(200);

      // Ensure that no new logs have been written after setting log level to off
      // Length should not change.
      expect(stringBuffer.length, oldStringBufferLength);
    }

    Future executeComplexCodeToDebug() async {
      // Capture log length before new write transaction
      final previousStringBufferLength = stringBuffer.length;

      realm.write(() => realm.add(Person(ObjectId(), 'Mon', 'Mothma')));

      // Hack to wait for stream to process
      await delay(200);

      // There should be more log records than before the latest write
      // transaction
      expect(stringBuffer.length, greaterThan(previousStringBufferLength));
    }

    // :snippet-start: change-log-level
    // :snippet-start: set-log-level-to-off
    Realm.logger.setLogLevel(LogLevel.off);
    // :snippet-end:
    await executeAppCode();

    Realm.logger.setLogLevel(LogLevel.debug, category: LogCategory.realm);
    await executeComplexCodeToDebug();
    // :snippet-end:

    await cleanUpRealm(realm);
  });
}
