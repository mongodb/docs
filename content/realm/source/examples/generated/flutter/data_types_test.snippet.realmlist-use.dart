final artemis =
    realm.write(() => realm.add(Player(ObjectId(), 'Art3mis', inventory: [
          Item(ObjectId(), 'elvish sword', 'sword forged by elves'),
          Item(ObjectId(), 'body armor', 'protects player from damage'),
        ], traits: [
          'brave',
          'kind'
        ])));

// Get a RealmList by property name with dynamic.getList()
final inventory = artemis.dynamic.getList('inventory');

// Use RealmList methods to filter results
RealmList<String> traits = artemis.traits;
final brave = traits.firstWhere((element) => element == 'brave');

final elvishSword =
    artemis.inventory.where((item) => item.name == 'elvish sword').first;

// Query RealmList with Realm Query Language
final playersWithBodyArmor =
    realm.query<Player>("inventory.name == \$0", ['body armor']);
print("LEN ${playersWithBodyArmor.length}");
