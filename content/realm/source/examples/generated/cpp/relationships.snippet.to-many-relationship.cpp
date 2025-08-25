struct Company {
  int64_t _id;
  std::string name;
  // To-many relationships are a list, represented here as a
  // vector container whose value type is the SDK object
  // type that the list field links to.
  std::vector<Employee*> employees;
};
REALM_SCHEMA(Company, _id, name, employees)
