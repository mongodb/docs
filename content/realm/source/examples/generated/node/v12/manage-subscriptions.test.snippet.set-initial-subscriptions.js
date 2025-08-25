const config = {
  schema: [Task],
  sync: {
    user: app.currentUser,
    flexible: true,
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(realm.objects(Task).filtered("status == 'in progress'"), {
          name: "In progress tasks",
        });
      },
      rerunOnOpen: true,
    },
  },
};

const realm = await Realm.open(config);
