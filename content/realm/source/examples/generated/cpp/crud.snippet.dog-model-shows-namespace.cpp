namespace realm {
struct Dog {
  std::string name;
  int64_t age;
};
REALM_SCHEMA(Dog, name, age)
}  // namespace realm
