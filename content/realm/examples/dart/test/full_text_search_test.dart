import 'package:realm_dart/realm.dart';
import 'package:test/test.dart';
import './utils.dart';

part 'full_text_search_test.realm.dart';

// :snippet-start: flutter-fts-annotation
@RealmModel()
class _Rug {
    @PrimaryKey()
    late ObjectId id;

    @Indexed(RealmIndexType.fullText)
    late String pattern;

    @Indexed(RealmIndexType.fullText)
    late String material;

    late int softness;
}
// :snippet-end:

void main() {
  test('FTS query', () async {

    final config = Configuration.local([Rug.schema]);
    final realm = Realm(config);

    // Create object IDs that we can compare for tests.
    final objectId1 = ObjectId();
    final objectId2 = ObjectId();

    // Create two realm objects for testing.
    final rug1 = Rug(objectId1, 'striped', 'wool', 2);
    final rug2 = Rug(objectId2, 'chevron', 'cotton', 1);

    realm.write(() {
      // Add all rug objects to the realm.
      realm.addAll([rug1, rug2]);
    });

    // :snippet-start: flutter-fts-query
    // Find rugs with a chevron pattern
    final chevronRugs = realm.query<Rug>("pattern TEXT \$0", ["chevron"]);
    print(chevronRugs.first.pattern); // :remove:
    expect(chevronRugs.first.id, objectId2); // :remove:

    // Find rugs with a wool material but not sheep wool
    final notSheepWoolRugs = realm.query<Rug>("material TEXT \$0", [" -sheep wool"]);

    // Find rugs with a material starting with "co-"
    final coRugs = realm.query<Rug>("material TEXT \$0", ["co*"]);
    // :snippet-end: 

    // Make sure 'not' query ran correctly
    print(notSheepWoolRugs.first.material);
    expect(notSheepWoolRugs.first.id, objectId1);

    // Make sure prefix query ran correctly
    print(coRugs.first.material);
    expect(coRugs.first.id, objectId2);

    // Clean up and close the realm. This deletes any existing objects.
    await cleanUpRealm(realm);
    realm.close();
    expect(realm.isClosed, true);
  });
}
