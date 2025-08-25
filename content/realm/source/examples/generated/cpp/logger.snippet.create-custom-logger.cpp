struct MyCustomLogger : realm::logger {
  // This could be called from any thread, so may not output visibly to the
  // console. Handle output in a queue or other cross-thread context if needed.
  void do_log(realm::logger::level level, const std::string &msg) override {
    std::cout << "Realm log entry: " << msg << std::endl;
  }
};
