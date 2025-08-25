auto todo = realm::Todo{.name = "Create my first todo item",
                              .status = "In Progress"};

realm.write([&] { realm.add(std::move(todo)); });
