auto repositories = realm.objects<realm::Repository>();

auto repositoriesNamedDocsRealm = repositories.where([](auto &repository) {
  return repository.ownerAndName == "mongodb/docs-realm";
});

auto docsRealm = repositoriesNamedDocsRealm[0];

// You can check the size of the set
auto numberOfPullRequests = docsRealm.openPullRequestNumbers.size();

// Find an element in the set whose value is 3064
auto it = managedDocsRealm.openPullRequestNumbers.find(3064);

// Get a copy of the set that exists independent of the managed set
auto openRealmPullRequests = docsRealm.openPullRequestNumbers.detach();
