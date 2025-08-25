auto info = receivedSyncError.compensating_writes_info();
for (auto &v : info) {
  std::cout << "A write was rejected with a compensating write error.\n";
  std::cout << "An object of type " << v.object_name << "\n";
  std::cout << "was rejected because " << v.reason << ".\n";
}
