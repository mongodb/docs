auto businesses = realm.objects<realm::Business>();
auto mongoDBBusinesses = businesses.where(
    [](auto &business) { return business.name == "MongoDB"; });
auto theMongoDB = mongoDBBusinesses[0];

realm.write([&] {
  auto newContactDetails = realm::ContactDetails{
      .emailAddress = "info@example.com", .phoneNumber = "234-567-8901"};
  // Overwrite the embedded object
  theMongoDB.contactDetails = &newContactDetails;
});
