auto config = realm::db_config();
auto realm = realm::db(std::move(config));

auto contactDetails = realm::ContactDetails{
    .emailAddress = "email@example.com", .phoneNumber = "123-456-7890"};
auto business = realm::Business();
business._id = realm::object_id::generate();
business.name = "MongoDB";
business.contactDetails = &contactDetails;

realm.write([&] { realm.add(std::move(business)); });
