// Filter by FTS property value using 'TEXT'

// Find all frogs with "green" in the physical description
val onlyGreenFrogs =
    realm.query<Frog>("physicalDescription TEXT $0", "green").find()

// Find all frogs with "green" but not "small" in the physical description
val onlyBigGreenFrogs =
    realm.query<Frog>("physicalDescription TEXT $0", "green -small").find()

// Find all frogs with "muppet-" and "rain-" in the physical description
val muppetsInTheRain =
    realm.query<Frog>("physicalDescription TEXT $0", "muppet* rain*").find()
