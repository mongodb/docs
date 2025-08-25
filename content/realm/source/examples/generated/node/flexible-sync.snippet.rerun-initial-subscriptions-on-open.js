// Set the date a week ago and the date a week from now, as those are the dates we'll use
// in the Flexible Sync query. `rerunOnOpen` lets the app recalculate this query every
// time the app opens.
const todaysDate = new Date();
const dateLastWeek = new Date(
  todaysDate.getFullYear(),
  todaysDate.getMonth(),
  todaysDate.getDate() - 7
);
const dateNextWeek = new Date(
  todaysDate.getFullYear(),
  todaysDate.getMonth(),
  todaysDate.getDate() + 7
);

const config = {
  sync: {
    user: app.currentUser,
    flexible: true,
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(
          realm
            .objects("Task")
            .filtered(
              "dueDate >= $0 && dueDate <= $1",
              dateLastWeek,
              dateNextWeek
            )
        );
      },
      rerunOnOpen: true,
    },
  },
};
const realm = await Realm.open(config);
