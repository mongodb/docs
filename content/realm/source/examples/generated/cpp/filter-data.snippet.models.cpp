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
