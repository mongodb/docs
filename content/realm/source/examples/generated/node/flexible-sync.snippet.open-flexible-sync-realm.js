const realm = await Realm.open({
  schema: [TaskSchema, TeamSchema],
  sync: {
    user: app.currentUser,
    flexible: true,
  },
});
