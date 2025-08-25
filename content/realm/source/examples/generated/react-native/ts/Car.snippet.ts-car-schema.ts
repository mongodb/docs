class Car extends Realm.Object {
  make!: string;
  model!: string;
  miles: number = 0;
  timestamp: number = Math.round(new Date().getTime() / 1000);

  static schema: ObjectSchema = {
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
