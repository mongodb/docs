namespace realm {
struct Repository {
  std::string ownerAndName;
  std::set<int64_t> openPullRequestNumbers;
};
REALM_SCHEMA(Repository, ownerAndName, openPullRequestNumbers)
}  // namespace realm
