.. warning:: Restore Sync after Terminating Sync

   When you terminate and re-enable Atlas Device Sync, clients can no longer Sync. 
   Your client must implement a client reset handler to restore Sync. This 
   handler can discard or attempt to recover unsynchronized changes.

   - :ref:`Client Reset - Flutter SDK <flutter-client-reset>`
   - :ref:`Client Reset - Java SDK <java-client-resets>`
   - :ref:`Client Reset - Kotlin SDK <kotlin-client-reset>`
   - :ref:`Client Reset - .NET SDK <dotnet-client-resets>`
   - :ref:`Client Reset - Node SDK <node-client-resets>`
   - :ref:`Client Reset - React Native SDK <react-native-client-resets>`
   - :ref:`Client Reset - Swift SDK <ios-client-resets>`
