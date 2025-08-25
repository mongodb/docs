auto completedItemsForAli = items.where([](auto const& item) {
  return item.assignee == std::string("Ali") && item.isComplete == true;
});
