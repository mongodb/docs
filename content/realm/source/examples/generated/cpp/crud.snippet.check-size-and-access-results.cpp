auto managedBusinesses = realm.objects<realm::Business>();
auto businessesNamedMongoDB = managedBusinesses.where(
    [](auto &business) { return business.name == "MongoDB"; });
CHECK(businessesNamedMongoDB.size() >= 1);
auto mongoDB = businessesNamedMongoDB[0];
