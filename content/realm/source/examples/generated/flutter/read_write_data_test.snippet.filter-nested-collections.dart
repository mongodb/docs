realm.write(() {
  realm.addAll([
    (Team(ObjectId(), 'Janitorial Staff',
        eventLog: RealmValue.from({
          '1': {
            'date': DateTime.utc(5622, 8, 18, 12, 30, 0),
            'type': ['work_order', 'maintenance'],
            'summary': 'leaking pipes in control room',
            'priority': 'high',
          },
          '2': {
            'date': DateTime.utc(5622, 9, 18, 12, 30, 0),
            'type': ['maintenance'],
            'summary': 'trash compactor jammed',
            'priority': 'low',
            'comment': 'this is the second time this week'
          }
        }))),
    (Team(ObjectId(), 'IT',
        eventLog: RealmValue.from({
          '1': {
            'date': DateTime.utc(5622, 9, 20, 12, 30, 0),
            'type': ['hardware', 'repair'],
            'summary': 'lightsaber damage to server room',
            'priority': 'high',
          }
        })))
  ]);

  final teams = realm.all<Team>();
  // Use bracket notation to query collection values at the specified path
  final teamsWithHighPriorityEvents =
      // Check any element at that path with [*]
      teams.query("eventLog[*].priority == 'high'");
  print(teamsWithHighPriorityEvents.length); // prints `2`

  final teamsWithMaintenanceEvents =
      // Check for the first element at that path with [FIRST]
      teams.query("eventLog[*].type[FIRST] == 'maintenance'");
  print(teamsWithMaintenanceEvents.length); // prints `1`

  final teamsWithMultipleEvents =
      // Check for collection at that path with matching elements
      // Note that the order must match unless you use ANY or ALL
      teams.query("eventLog[*].type[*] == {'maintenance', 'work_order'}");
  print(
      teamsWithMultipleEvents.length); // prints `0` because order matters

  final teamsWithEventsAsLists =
      // Check the collection type with @type
      teams.query("eventLog[*].type.@type == 'list'");
  print(teamsWithEventsAsLists.length); // prints `2`
});
