if (change.error) {
  rethrow_exception(change.error);
}
if (change.is_deleted) {
  std::cout << "The object was deleted.\n";
} else {
  for (auto& propertyChange : change.property_changes) {
    std::cout << "The object's " << propertyChange.name
              << " property has changed.\n";
    auto newPropertyValue =
        std::get<std::string>(*propertyChange.new_value);
    std::cout << "The new value is " << newPropertyValue << "\n";
  }
}
