// Get frozen objects.
// Here, we're getting them from a frozen database,
// but you might also be passing them across threads.
auto frozenItems = frozenRealm.objects<realm::Item>();

// The collection that we pull from the frozen database is also frozen.
CHECK(frozenItems.is_frozen());

// Get the individual objects we want to work with.
auto specificFrozenItems = frozenItems.where(
    [](auto const& item) { return item.name == "Save the cheerleader"; });
auto frozenProjects =
    frozenRealm.objects<realm::Project>().where(
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

auto managingRealm = thawedProject.get_realm();
managingRealm.write([&] { thawedProject.items.push_back(thawedItem); });
