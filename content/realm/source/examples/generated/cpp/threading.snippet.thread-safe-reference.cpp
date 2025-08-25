// Put a managed object into a thread safe reference
auto threadSafeItem =
    realm::thread_safe_reference<realm::Item>{managedItem};

// Move the thread safe reference to a background thread
auto thread =
    std::thread([threadSafeItem = std::move(threadSafeItem), path]() mutable {
      // Open the database again on the background thread
      auto backgroundConfig = realm::db_config();
      backgroundConfig.set_path(path);
      auto backgroundRealm = realm::db(std::move(backgroundConfig));

      // Resolve the Item instance via the thread safe
      // reference
      auto item = backgroundRealm.resolve(std::move(threadSafeItem));

      // ... use item ...
    });

// Wait for thread to complete
thread.join();
