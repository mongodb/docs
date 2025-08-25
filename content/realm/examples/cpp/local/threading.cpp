// :replace-start: {
//   "terms": {
//     "ThreadingExample_": ""
//   }
// }
#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

namespace realm {
// :snippet-start: item-model
struct ThreadingExample_Item {
  std::string name;
};
REALM_SCHEMA(ThreadingExample_Item, name)
// :snippet-end:
}  // namespace realm

TEST_CASE("thread safe reference", "[write]") {
  auto relative_realm_path_directory = "tsr/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("tsr_objects");
  path = path.replace_extension("realm");

  auto config = realm::db_config();
  config.set_path(path);
  auto realm = realm::db(std::move(config));

  auto item = realm::ThreadingExample_Item{
      .name = "Save the cheerleader",
  };

  realm.write([&] { realm.add(std::move(item)); });

  // :snippet-start: realm-refresh
  realm.refresh();
  // :snippet-end:

  auto managedItems = realm.objects<realm::ThreadingExample_Item>();
  auto managedItem = managedItems[0];

  // :snippet-start: thread-safe-reference
  // Put a managed object into a thread safe reference
  auto threadSafeItem =
      realm::thread_safe_reference<realm::ThreadingExample_Item>{managedItem};

  // Move the thread safe reference to a background thread
  auto thread =
      std::thread([threadSafeItem = std::move(threadSafeItem), path]() mutable {
        // Open the database again on the background thread
        auto backgroundConfig = realm::db_config();
        backgroundConfig.set_path(path);
        auto backgroundRealm = realm::db(std::move(backgroundConfig));

        // Resolve the ThreadingExample_Item instance via the thread safe
        // reference
        auto item = backgroundRealm.resolve(std::move(threadSafeItem));

        // ... use item ...
      });

  // Wait for thread to complete
  thread.join();
  // :snippet-end:
}

TEST_CASE("scheduler", "[write]") {
  auto shouldQuitProgram = true;

  auto relative_realm_path_directory = "scheduler/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("scheduler");
  path = path.replace_extension("realm");

  // :snippet-start: scheduler
  struct MyScheduler : realm::scheduler {
    MyScheduler() {
      // ... Kick off task processor thread(s) and run until the scheduler
      // goes out of scope ...
    }

    ~MyScheduler() override {
      // ... Call in the processor thread(s) and block until return ...
    }

    void invoke(std::function<void()>&& task) override {
      // ... Add the task to the (lock-free) processor queue ...
    }

    [[nodiscard]] bool is_on_thread() const noexcept override {
      // ... Return true if the caller is on the same thread as a processor
      // thread ...
      return false;  // :remove:
    }

    bool is_same_as(const realm::scheduler* other) const noexcept override {
      // ... Compare scheduler instances ...
      return false;  // :remove:
    }

    [[nodiscard]] bool can_invoke() const noexcept override {
      // ... Return true if the scheduler can accept tasks ...
      return false;  // :remove:
    }
    // ...
  };

// :remove-start:
// NOTE: Switched from using Bluehawk uncomment to the #if here because
// when `int main() {` was commented out, the linter was removing the indent
// for the code inside the block. Switching to an #if that never runs
// this code lets the linter properly lint this example.
#if USE_EXAMPLE_MAIN
  // :remove-end:
  int main() {
    // Set up a custom scheduler.
    auto scheduler = std::make_shared<MyScheduler>();

    // Pass the scheduler instance to the realm configuration.
    auto config = realm::db_config{path, scheduler};

    // Start the program main loop.
    auto done = false;
    while (!done) {
      // This assumes the scheduler is implemented so that it
      // continues processing tasks on background threads until
      // the scheduler goes out of scope.

      // Handle input here.
      // ...
      if (shouldQuitProgram) {
        done = true;
      }
    }
  }
// :snippet-end:
#endif
}

TEST_CASE("test freeze", "[write]") {
  auto relative_realm_path_directory = "freeze/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("frozen_objects");
  path = path.replace_extension("realm");

  auto config = realm::db_config();
  config.set_path(path);

  // :snippet-start: freeze
  auto realm = realm::db(std::move(config));

  // :remove-start:
  auto item = realm::ThreadingExample_Item{
      .name = "Save the cheerleader",
  };

  realm.write([&] { realm.add(std::move(item)); });
  // :remove-end:
  // Get an immutable copy of the database that can be passed across threads.
  auto frozenRealm = realm.freeze();

  // :snippet-start: is-frozen
  CHECK(frozenRealm.is_frozen());  // :remove:
  if (frozenRealm.is_frozen()) {
    // Do something with the frozen database.
    // You may pass a frozen realm, collection, or objects
    // across threads. Or you may need to `.thaw()`
    // to make it mutable again.
  }
  // :snippet-end:

  // You can freeze collections.
  auto managedItems = realm.objects<realm::ThreadingExample_Item>();
  auto frozenItems = managedItems.freeze();

  CHECK(frozenItems.is_frozen());

  // You can read from frozen databases.
  auto itemsFromFrozenRealm =
      frozenRealm.objects<realm::ThreadingExample_Item>();

  CHECK(itemsFromFrozenRealm.is_frozen());

  // You can freeze objects.
  auto managedItem = managedItems[0];
  CHECK(managedItem.get_realm().is_frozen() == false);  // :remove:
  auto frozenItem = managedItem.freeze();

  CHECK(frozenItem.is_frozen());

  // Frozen objects have a reference to a frozen realm.
  CHECK(frozenItem.get_realm().is_frozen());
  // :snippet-end:

  realm.write([&] { realm.remove(managedItem); });
}

TEST_CASE("test thaw", "[write]") {
  auto relative_realm_path_directory = "thaw/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("thaw_test_objects");
  path = path.replace_extension("realm");

  auto config = realm::db_config();
  config.set_path(path);
  auto realm = realm::db(std::move(config));
  auto item = realm::ThreadingExample_Item{
      .name = "Save the cheerleader",
  };

  realm.write([&] { realm.add(std::move(item)); });

  auto frozenRealm = realm.freeze();

  CHECK(frozenRealm.is_frozen());

  // :snippet-start: thaw
  // Read from a frozen database.
  auto frozenItems = frozenRealm.objects<realm::ThreadingExample_Item>();

  // The collection that we pull from the frozen database is also frozen.
  CHECK(frozenItems.is_frozen());

  // Get an individual item from the collection.
  auto frozenItem = frozenItems[0];

  // To modify the item, you must first thaw it.
  // You can also thaw collections and realms.
  auto thawedItem = frozenItem.thaw();

  // Check to make sure the item is valid. An object is
  // invalidated when it is deleted from its managing database,
  // or when its managing realm has invalidate() called on it.
  REQUIRE(thawedItem.is_invalidated() == false);

  // Thawing the item also thaws the frozen database it references.
  auto thawedRealm = thawedItem.get_realm();
  REQUIRE(thawedRealm.is_frozen() == false);

  // With both the object and its managing database thawed, you
  // can safely modify the object.
  thawedRealm.write([&] { thawedItem.name = "Save the world"; });
  // :snippet-end:
  REQUIRE(thawedItem.name == "Save the world");

  thawedRealm.write([&] { thawedRealm.remove(thawedItem); });
}

namespace realm {
// :snippet-start: model-with-collection-property
struct ThreadingExample_Project {
  std::string name;
  std::vector<realm::ThreadingExample_Item*> items;
};
REALM_SCHEMA(ThreadingExample_Project, name, items)
// :snippet-end:
}  // namespace realm

TEST_CASE("append to frozen collection", "[write]") {
  auto relative_realm_path_directory = "frozen_collection/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("frozen_collection_test_objects");
  path = path.replace_extension("realm");

  auto config = realm::db_config();
  config.set_path(path);
  auto realm = realm::db(std::move(config));
  auto item = realm::ThreadingExample_Item{
      .name = "Save the cheerleader",
  };
  auto project = realm::ThreadingExample_Project{
      .name = "Heroes: Genesis",
  };

  realm.write([&] {
    realm.add(std::move(item));
    realm.add(std::move(project));
  });

  auto frozenRealm = realm.freeze();

  CHECK(frozenRealm.is_frozen());

  // :snippet-start: append-to-frozen-collection
  // Get frozen objects.
  // Here, we're getting them from a frozen database,
  // but you might also be passing them across threads.
  auto frozenItems = frozenRealm.objects<realm::ThreadingExample_Item>();

  // The collection that we pull from the frozen database is also frozen.
  CHECK(frozenItems.is_frozen());

  // Get the individual objects we want to work with.
  auto specificFrozenItems = frozenItems.where(
      [](auto const& item) { return item.name == "Save the cheerleader"; });
  auto frozenProjects =
      frozenRealm.objects<realm::ThreadingExample_Project>().where(
          [](auto const& project) {
            return project.name == "Heroes: Genesis";
          });
  ;
  auto frozenItem = specificFrozenItems[0];
  auto frozenProject = frozenProjects[0];

  // Thaw the frozen objects. You must thaw both the object
  // you want to append and the object whose collection
  // property you want to append to.
  auto thawedItem = frozenItem.thaw();
  auto thawedProject = frozenProject.thaw();
  REQUIRE(thawedProject.items.size() == 0);  // :remove:

  auto managingRealm = thawedProject.get_realm();
  managingRealm.write([&] { thawedProject.items.push_back(thawedItem); });
  // :snippet-end:
  REQUIRE(thawedProject.items.size() == 1);

  managingRealm.write([&] {
    managingRealm.remove(thawedProject);
    managingRealm.remove(thawedItem);
  });
}
// :replace-end:
