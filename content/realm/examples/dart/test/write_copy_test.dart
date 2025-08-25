import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'utils.dart';
import 'dart:math';
part 'write_copy_test.realm.dart';

@RealmModel()
class _Person {
  @PrimaryKey()
  late String name;
}

main() {
  test("Convert in-memory realm to local realm", () async {
    // :snippet-start: in-memory-to-local
    // Create in-memory realm and add data to it.
    // Note that even though the realm is in-memory, it still has a file path.
    // This is because in-memory realms still use memory-mapped files
    // for their operations; they just don't persist data across launches.
    final inMemoryRealm =
        Realm(Configuration.inMemory([Person.schema], path: 'inMemory.realm'));
    inMemoryRealm.write(() {
      inMemoryRealm.addAll([Person("Tanya"), Person("Greg"), Person("Portia")]);
    });

    // Copy contents of `inMemoryRealm` to a new realm with `localConfig`.
    // `localConfig` uses the default file path for local realms.
    final localConfig = Configuration.local([Person.schema]);
    inMemoryRealm.writeCopy(localConfig);
    // Close the realm you just copied when you're done working with it.
    inMemoryRealm.close();

    // Open the local realm that the data from `inMemoryRealm`
    // was just copied to with `localConfig`.
    final localRealm = Realm(localConfig);

    // Person object for "Tanya" is in `localRealm` because
    // the data was copied over with `inMemoryRealm.writeCopy()`.
    final tanya = localRealm.find<Person>("Tanya");
    // :snippet-end:
    expect(tanya, isA<Person>());
    expect(localRealm.all<Person>().length, 3);
    await cleanUpRealm(localRealm);
  });
  test("Convert unencrypted local realm to encrypted local realm", () async {
    // :snippet-start: unencrypted-to-encrypted
    // Create unencrypted realm and add data to it.
    final unencryptedRealm = Realm(Configuration.local([Person.schema]));
    unencryptedRealm.write(() => unencryptedRealm.addAll([
          Person("Daphne"),
          Person("Harper"),
          Person("Ethan"),
          Person("Cameron")
        ]));

    // Create encryption key and encrypted realm.
    final key = List<int>.generate(64, (i) => Random().nextInt(256));
    final encryptedConfig = Configuration.local([Person.schema],
        path: 'encrypted.realm', encryptionKey: key);
    // Copy the data from `unencryptedRealm` to a new realm with
    // the `encryptedConfig`. The data is encrypted as part of the copying.
    unencryptedRealm.writeCopy(encryptedConfig);
    // Close the realm you just copied when you're done working with it.
    unencryptedRealm.close();

    // Open the new encrypted realm with `encryptedConfig`.
    final encryptedRealm = Realm(encryptedConfig);

    // Person object for "Harper" is in `localRealm` because
    // the data was copied over with `unencryptedRealm.writeCopy()`.
    final harper = encryptedRealm.find<Person>('Harper');
    // :snippet-end:
    expect(harper, isA<Person>());
    expect(encryptedRealm.all<Person>().length, 4);
    await cleanUpRealm(encryptedRealm);
    await cleanUpRealm(unencryptedRealm);
  });
}
