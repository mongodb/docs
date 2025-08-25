struct Person {
  std::string name;
  std::vector<Dog*> dogs;
};
REALM_SCHEMA(Person, name, dogs)
