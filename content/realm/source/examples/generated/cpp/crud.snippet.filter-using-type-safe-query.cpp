auto businessesNamedMongoDB = managedBusinesses.where(
    [](auto &business) { return business.name == "MongoDB"; });
