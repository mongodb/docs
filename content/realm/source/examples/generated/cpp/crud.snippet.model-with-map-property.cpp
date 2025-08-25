namespace realm {
struct Employee {
  enum class WorkLocation { HOME, OFFICE };

  int64_t _id;
  std::string firstName;
  std::string lastName;
  std::map<std::string, WorkLocation> locationByDay;
};
REALM_SCHEMA(Employee, _id, firstName, lastName, locationByDay)
}  // namespace realm
