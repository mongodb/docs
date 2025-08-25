namespace realm {
struct Employee {
  realm::primary_key<int64_t> _id;
  std::string firstName;
  std::string lastName;

  // You can use this property as you would any other member
  // Omitting it from the schema means the SDK ignores it
  std::string jobTitle_notPersisted;
};
// The REALM_SCHEMA omits the `jobTitle_notPersisted` property
// The SDK does not store and cannot retrieve a value for this property
REALM_SCHEMA(Employee, _id, firstName, lastName)
}  // namespace realm
