const realm = await Realm.open({
    schema: [Dog],
    schemaVersion: 2,
    onMigration: (oldRealm, newRealm) => {
        if(oldRealm.schemaVersion < 2){
            const oldObjects = oldRealm.objects('Dog');
            const newObjects = newRealm.objects('Dog');
            // loop through all objects and set the _id property in the new schema
            for (const objectIndex in oldObjects) {
              const oldObject = oldObjects[objectIndex];
              const newObject = newObjects[objectIndex];
              newObject._id = oldObject._id.toHexString();
            }
        }
    },
  });