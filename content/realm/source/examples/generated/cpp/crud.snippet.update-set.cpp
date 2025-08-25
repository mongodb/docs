// Add elements to the set in a write transaction
realm.write([&] { managedDocsRealm.openPullRequestNumbers.insert(3066); });
CHECK(managedDocsRealm.openPullRequestNumbers.size() == 4);

// Use std::set algorithms to update a set
// In this example, use std::set_union to add elements to the set
// 3064 already exists, so it won't be added, but 3065 and 3067 are
// unique values and will be added to the set.
auto newOpenPullRequests = std::set<int64_t>({3064, 3065, 3067});
realm.write([&] {
  std::set_union(
      docsRealm.openPullRequestNumbers.begin(),
      docsRealm.openPullRequestNumbers.end(), newOpenPullRequests.begin(),
      newOpenPullRequests.end(),
      std::inserter(managedDocsRealm.openPullRequestNumbers,
                    managedDocsRealm.openPullRequestNumbers.end()));
});
CHECK(managedDocsRealm.openPullRequestNumbers.size() == 6);

// Erase elements from a set
auto it3065 = managedDocsRealm.openPullRequestNumbers.find(3065);
CHECK(it3065 != managedDocsRealm.openPullRequestNumbers.end());
realm.write([&] { managedDocsRealm.openPullRequestNumbers.erase(it3065); });
