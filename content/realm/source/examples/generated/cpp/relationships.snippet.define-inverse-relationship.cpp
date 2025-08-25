struct Dog;
struct Person {
  realm::primary_key<int64_t> _id;
  std::string name;
  int64_t age = 0;
  Dog* dog;
};
REALM_SCHEMA(Person, _id, name, age, dog)
struct Dog {
  realm::primary_key<int64_t> _id;
  std::string name;
  int64_t age = 0;
  linking_objects<&Person::dog> owners;
};
REALM_SCHEMA(Dog, _id, name, age, owners)
