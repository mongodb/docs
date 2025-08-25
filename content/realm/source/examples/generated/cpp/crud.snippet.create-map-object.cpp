auto config = realm::db_config();
auto realm = realm::db(std::move(config));

auto employee = realm::Employee{
    ._id = 8675309, .firstName = "Tommy", .lastName = "Tutone"};

employee.locationByDay = {
    {"Monday", realm::Employee::WorkLocation::HOME},
    {"Tuesday", realm::Employee::WorkLocation::OFFICE},
    {"Wednesday", realm::Employee::WorkLocation::HOME},
    {"Thursday", realm::Employee::WorkLocation::OFFICE}};

realm.write([&] {
  realm.add(std::move(employee));
  employee.locationByDay["Friday"] = realm::Employee::WorkLocation::HOME;
});
