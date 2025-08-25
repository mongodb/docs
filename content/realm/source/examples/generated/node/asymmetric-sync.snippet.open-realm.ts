const realm = await Realm.open({
  schema: [WeatherSensor],
  sync: {
    user: app.currentUser,
    flexible: true,
  },
});
