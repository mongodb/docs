namespace realm {
struct Todo {
  realm::primary_key<realm::object_id> _id{realm::object_id::generate()};
  std::string name;
  std::string status;
  // The ownerId property stores the user.identifier() of a
  // logged-in user. Omit this property for the non-sync example.
  std::string ownerId;
};
REALM_SCHEMA(Todo, _id, name, status, ownerId);
}  // namespace realm
