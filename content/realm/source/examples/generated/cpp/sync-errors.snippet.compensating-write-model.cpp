struct Item {
  realm::primary_key<realm::object_id> _id{realm::object_id::generate()};
  std::string ownerId;
  std::string itemName;
  int64_t complexity;
};
REALM_SCHEMA(Item, _id, ownerId, itemName, complexity)
