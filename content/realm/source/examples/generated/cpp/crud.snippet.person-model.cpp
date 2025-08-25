struct Person {
  realm::primary_key<int64_t> _id;
  std::string name;
  int64_t age;

  // Create relationships by pointing an Object field to another struct or class
  Dog *dog;
};
REALM_SCHEMA(Person, _id, name, age, dog)
