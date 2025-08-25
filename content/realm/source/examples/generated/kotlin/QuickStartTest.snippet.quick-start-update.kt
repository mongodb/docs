// change the first item with open status to complete to show that the todo item has been done
realm.writeBlocking {
    findLatest(incompleteItems[0])?.isComplete = true
}
