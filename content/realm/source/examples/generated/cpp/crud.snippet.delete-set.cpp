// Remove an element from the set with erase()
auto it3064 = managedDocsRealm.openPullRequestNumbers.find(3064);
CHECK(it3064 != managedDocsRealm.openPullRequestNumbers.end());
realm.write([&] { managedDocsRealm.openPullRequestNumbers.erase(it3065); });
CHECK(managedDocsRealm.openPullRequestNumbers.size() == 4);

// Clear the entire contents of the set
realm.write([&] { managedDocsRealm.openPullRequestNumbers.clear(); });
CHECK(managedDocsRealm.openPullRequestNumbers.size() == 0);
