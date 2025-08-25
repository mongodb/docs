class Car extends Realm.Object {
  static schema = {
    name: 'Car',
    properties: {
      make: 'string',
      model: 'string',
      miles: {type: 'int', default: 0},
      timestamp: {
        type: 'int',
        default: () => Math.round(new Date().getTime() / 1000),
      },
    },
  };
}
