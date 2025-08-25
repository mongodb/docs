class Character extends Realm.Object<Character> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  levelsCompleted!: Realm.Set<number>;
  inventory!: Realm.Set<string>;

  static schema: ObjectSchema = {
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
