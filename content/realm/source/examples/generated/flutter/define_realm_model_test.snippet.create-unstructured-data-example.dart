realm.write(() {
  // Add `eventLog` property data as a map of mixed data, which 
  // also includes nested lists of mixed data 
  realm.add(EventLog(ObjectId(), 'purchase', DateTime.now(), 'user123',
      details: RealmValue.from({
        'ipAddress': '192.168.1.1',
        'items': [
          {'id': 1, 'name': 'Laptop', 'price': 1200.00},
          {'id': 2, 'name': 'Mouse', 'price': 49.99}
        ],
        'total': 1249.99
      })));

  final eventLog = realm.all<EventLog>().first;
  final items = eventLog.details.asMap();
  print('''
      Event Type: ${eventLog.eventType}
      Timestamp: ${eventLog.timestamp}
      User ID: ${eventLog.userId}
      Details:
        Item: 
  ''');
  for (var item in items.entries) {
    print('${item.key}: ${item.value}');
  }
