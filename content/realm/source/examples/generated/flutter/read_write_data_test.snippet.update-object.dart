realm.write(() {
  spaceshipTeam.name = 'Galactic Republic Scout Team';
  spaceshipTeam.crew
      .addAll([Person(ObjectId(), 'Luke'), Person(ObjectId(), 'Leia')]);
});
