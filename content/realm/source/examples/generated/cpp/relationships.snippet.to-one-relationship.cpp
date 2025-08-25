struct FavoriteToy {
  realm::primary_key<realm::uuid> _id;
  std::string name;
};
REALM_SCHEMA(FavoriteToy, _id, name)

struct Dog {
  realm::primary_key<realm::uuid> _id;
  std::string name;
  int64_t age;

  // Define a relationship as a link to another SDK object
  FavoriteToy* favoriteToy;
};
REALM_SCHEMA(Dog, _id, name, age, favoriteToy)
