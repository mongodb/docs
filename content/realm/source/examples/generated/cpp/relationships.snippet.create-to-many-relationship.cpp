auto config = realm::db_config();
auto realmInstance = realm::db(std::move(config));

auto employee1 = realm::Employee{
    ._id = 23456, .firstName = "Pam", .lastName = "Beesly"};

auto employee2 = realm::Employee{
    ._id = 34567, .firstName = "Jim", .lastName = "Halpert"};

auto company =
    realm::Company{._id = 45678, .name = "Dunder Mifflin"};

// Use the `push_back` member function available to the
// `ListObjectPersistable<T>` template to append `Employee` objects to
// the `Company` `employees` list property.
company.employees.push_back(&employee1);
company.employees.push_back(&employee2);

realmInstance.write([&] { realmInstance.add(std::move(company)); });
