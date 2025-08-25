auto connectionToken = syncSession->observe_connection_change(
    [&](enum realm::sync_session::connection_state,
        enum realm::sync_session::connection_state new_state) {
      // Register a block to execute when connection state changes.
    });
