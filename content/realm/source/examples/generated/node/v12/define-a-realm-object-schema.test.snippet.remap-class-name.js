class Task extends Realm.Object {
  static schema = {
    // Set the schema's `name` property to the name you want to store.
    // Here, we store items as `Todo_Item` instead of the class's `Task` name.
    name: "Todo_Item",
    properties: {
      _id: "int",
      name: "string",
      owner_id: "string?",
    },
    primaryKey: "_id",
  };
}

const config = {
  // Use the class name in the Configuration's `schema` property when
  // opening the realm.
  schema: [Task],
  sync: {
    user: anonymousUser,
    flexible: true,
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(
          realm
            // Use the mapped name in Flexible Sync subscriptions.
            .objects(`Todo_Item`)
            .filtered(`owner_id == "${anonymousUser.id}"`)
        );
      },
    },
  },
};

const realm = await Realm.open(config);

realm.write(() => {
  // Use the mapped name when performing CRUD operations.
  realm.create(`Todo_Item`, {
    _id: 12342245,
    owner_id: anonymousUser.id,
    name: "Test the Todo_Item object name",
  });
});

// Use the mapped name when performing CRUD operations.
const assignedTasks = realm.objects(`Todo_Item`);
