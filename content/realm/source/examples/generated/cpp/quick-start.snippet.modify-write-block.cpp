auto todoToUpdate = todosInProgress[0];
realm.write([&] { todoToUpdate.status = "Complete"; });
