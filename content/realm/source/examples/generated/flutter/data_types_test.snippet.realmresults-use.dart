RealmResults<Player> players = realm.all<Player>();
RealmResults<Player> bravePlayers =
    realm.query<Player>('ANY traits == \$0', ['brave']);
