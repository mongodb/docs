struct Project {
  std::string name;
  std::vector<realm::Item*> items;
};
REALM_SCHEMA(Project, name, items)
