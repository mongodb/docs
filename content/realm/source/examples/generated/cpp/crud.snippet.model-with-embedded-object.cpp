namespace realm {
struct ContactDetails {
  // Because ContactDetails is an embedded object, it cannot have its own _id
  // It does not have a lifecycle outside of the top-level object
  std::string emailAddress;
  std::string phoneNumber;
};
REALM_EMBEDDED_SCHEMA(ContactDetails, emailAddress, phoneNumber)

struct Business {
  realm::object_id _id;
  std::string name;
  ContactDetails *contactDetails;
};
REALM_SCHEMA(Business, _id, name, contactDetails)
}  // namespace realm
