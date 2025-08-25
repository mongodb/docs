// Initialize objects and assign values
let club = Club(value: ["name": "American Kennel Club", "url": "https://akc.org"])
let club2 = Club()
club2.name = "Continental Kennel Club"
// When assigning the value to a type-projected property, type safety
// checks for the mapped type - not the persisted type.
club2.url = URL(string: "https://ckcusa.com/")!
club2.location = CLLocationCoordinate2D(latitude: 40.7509, longitude: 73.9777)
