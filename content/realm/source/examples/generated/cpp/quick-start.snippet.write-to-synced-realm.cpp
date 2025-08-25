auto todo = realm::Todo{.name = "Create a Sync todo item",
                             .status = "In Progress",
                             .ownerId = userId};

realm.write([&] { realm.add(std::move(todo)); });

auto todos = realm.objects<realm::Todo>();
