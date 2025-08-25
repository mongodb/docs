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
