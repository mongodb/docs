final realm = Realm(Configuration.local([BinaryExample.schema]));

realm.write(() {
  realm.addAll([
    BinaryExample("Example binary object", Uint8List.fromList([1, 2]))
  ]);
});
