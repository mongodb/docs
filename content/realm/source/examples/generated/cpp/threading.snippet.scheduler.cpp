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
    }

    bool is_same_as(const realm::scheduler* other) const noexcept override {
      // ... Compare scheduler instances ...
    }

    [[nodiscard]] bool can_invoke() const noexcept override {
      // ... Return true if the scheduler can accept tasks ...
    }
    // ...
  };

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
