// Query for the object you want to update
auto dogs = realm.objects<realm::Dog>();
auto dogsNamedMaui =
    dogs.where([](auto &dog) { return dog.name == "Maui"; });
CHECK(dogsNamedMaui.size() >= 1);
// Access an object in the results set.
auto maui = dogsNamedMaui[0];

std::cout << "Dog " << maui.name.detach() << " is " << maui.age.detach()
          << " years old\n";

// Assign a new value to a member of the object in a write transaction
int64_t newAge = 2;
realm.write([&] { maui.age = newAge; });
