final companiesInSmallCircle =
    realm.query<Company>("location geoWithin \$0", [smallCircle]);

final companiesInLargeCircle =
    realm.query<Company>("location geoWithin \$0", [largeCircle]);
