namespace realm {
struct Dog {
  std::string name;
  std::map<std::string, std::string> favoriteParkByCity;
};
REALM_SCHEMA(Dog, name, favoriteParkByCity)
}  // namespace realm
