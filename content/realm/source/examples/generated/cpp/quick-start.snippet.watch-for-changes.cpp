auto token = specificTodo.observe([&](auto&& change) {
  try {
    if (change.error) {
      rethrow_exception(change.error);
    }
    if (change.is_deleted) {
      std::cout << "The object was deleted.\n";
    } else {
      for (auto& propertyChange : change.property_changes) {
        std::cout << "The object's " << propertyChange.name
                  << " property has changed.\n";
      }
    }
  } catch (std::exception const& e) {
    std::cerr << "Error: " << e.what() << "\n";
  }
});
