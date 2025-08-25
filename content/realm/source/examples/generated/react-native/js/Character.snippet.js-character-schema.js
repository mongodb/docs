class Character extends Realm.Object {
  static schema = {
    name: 'Character',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      levelsCompleted: 'int<>',
      inventory: {
        type: 'set',
        objectType: 'string',
      },
    },
  };
}
