const items = realm.objects("Item");
// Gets all items where the 'priority' property is 7 or more.
const importantItems = items.filtered("priority >= $0", 7);
