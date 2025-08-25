auto employees = realm.objects<realm::Employee>();
auto employeesNamedTommy = employees.where(
    [](auto &employee) { return employee.firstName == "Tommy"; });
auto tommy = employeesNamedTommy[0];
// You can get an iterator for an element matching a key using `find()`
auto tuesdayIterator = tommy.locationByDay.find("Tuesday");

// You can access values for keys like any other map type
auto mondayLocation = tommy.locationByDay["Monday"];
