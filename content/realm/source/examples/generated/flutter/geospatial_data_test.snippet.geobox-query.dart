final companiesInLargeBox =
    realm.query<Company>("location geoWithin \$0", [largeBox]);
final companiesInSmallBox =
    realm.query<Company>("location geoWithin \$0", [smallBox]);
