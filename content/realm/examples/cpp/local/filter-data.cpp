#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <string>

namespace realm {
// :snippet-start: models
struct Item {
  std::string name;
  bool isComplete;
  std::optional<std::string> assignee;
  int64_t priority;
  int64_t progressMinutes;
};
REALM_SCHEMA(Item, name, isComplete, assignee, priority, progressMinutes)

struct Project {
  std::string name;
  std::vector<Item*> items;
};
REALM_SCHEMA(Project, name, items)
// :snippet-end:
}  // namespace realm

TEST_CASE("set up tests", "[write]") {
  auto relative_realm_path_directory = "project/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("project_objects");
  path = path.replace_extension("realm");
  // :snippet-start: set-up-filter-data-tests
  auto config = realm::db_config();
  config.set_path(path);  // :remove:
  auto realm = realm::db(std::move(config));

  auto item1 = realm::Item{.name = "Save the cheerleader",
                           .assignee = std::string("Peter"),
                           .isComplete = false,
                           .priority = 6,
                           .progressMinutes = 30};

  auto project = realm::Project{.name = "New project"};

  project.items.push_back(&item1);

  realm.write([&] { realm.add(std::move(project)); });

  auto items = realm.objects<realm::Item>();
  auto projects = realm.objects<realm::Project>();
  // :snippet-end:

  CHECK(projects.size() == 1);
  CHECK(items.size() == 1);

  // :snippet-start: comparison-operators
  auto highPriorityItems =
      items.where([](auto const& item) { return item.priority > 5; });

  auto quickItems = items.where([](auto const& item) {
    return item.progressMinutes > 1 && item.progressMinutes < 30;
  });

  auto unassignedItems = items.where(
      [](auto const& item) { return item.assignee == std::nullopt; });

  auto aliOrJamieItems = items.where([](auto const& item) {
    return item.assignee == std::string("Ali") ||
           item.assignee == std::string("Jamie");
  });
  // :snippet-end:

  CHECK(highPriorityItems.size() >= 1);
  CHECK(quickItems.size() == 0);
  CHECK(unassignedItems.size() == 0);
  CHECK(aliOrJamieItems.size() == 0);

  // :snippet-start: logical-operators
  auto completedItemsForAli = items.where([](auto const& item) {
    return item.assignee == std::string("Ali") && item.isComplete == true;
  });
  // :snippet-end:

  CHECK(completedItemsForAli.size() == 0);

  // :snippet-start: string-operators
  auto containIe =
      items.where([](auto const& item) { return item.name.contains("ie"); });
  // :snippet-end:

  CHECK(containIe.size() == 0);

  auto specificProject = projects[0];
  auto specificItem = highPriorityItems[0];

  realm.write([&] {
    realm.remove(specificProject);
    realm.remove(specificItem);
  });
  CHECK(projects.size() == 0);
  CHECK(items.size() == 0);
}

TEST_CASE("sort list and results", "[write]") {
  auto relative_realm_path_directory = "project_items/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("project_and_item_objects");
  path = path.replace_extension("realm");

  auto config = realm::db_config();
  config.set_path(path);
  auto realm = realm::db(std::move(config));

  auto item1 = realm::Item{.name = "Save the cheerleader",
                           .assignee = std::string("Peter"),
                           .isComplete = false,
                           .priority = 6,
                           .progressMinutes = 30};

  auto item2 = realm::Item{.name = "Save the world",
                           .assignee = std::string("Peter"),
                           .isComplete = false,
                           .priority = 7,
                           .progressMinutes = 90};

  auto project = realm::Project{.name = "Heroes Project"};

  project.items.push_back(&item1);
  project.items.push_back(&item2);

  realm.write([&] { realm.add(std::move(project)); });

  // :snippet-start: sort-results-by-single-property
  auto items = realm.objects<realm::Item>();
  CHECK(items.size() == 2);  // :remove:

  // Sort with `false` returns objects in descending order.
  auto itemsSorted = items.sort("priority", false);
  // :snippet-end:
  // The item titled "Save the world" should be the first item since we are
  // sorting in descending order based on priority.
  CHECK(itemsSorted[0].name == "Save the world");

  auto projects = realm.objects<realm::Project>();
  CHECK(projects.size() == 1);  // :remove:
  auto specificProject = projects[0];

  // :snippet-start: sort-list-by-multiple-properties
  auto sortedListProperty =
      specificProject.items.sort({{"assignee", true}, {"priority", false}});
  // :snippet-end:
  // The item titled "Save the world" should be the first item since they both
  // have the same assignee, and we are sorting in descending order by priority
  // as the second sort arg.
  CHECK(sortedListProperty[0].name == "Save the world");

  auto specificItem = itemsSorted[0];
  auto anotherItem = itemsSorted[1];

  realm.write([&] {
    realm.remove(specificProject);
    realm.remove(specificItem);
    realm.remove(anotherItem);
  });
  CHECK(projects.size() == 0);
  CHECK(items.size() == 0);
}
