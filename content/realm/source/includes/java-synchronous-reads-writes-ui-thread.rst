.. important:: Synchronous Reads and Writes on the UI Thread
   
   By default, you can only read or write to a realm in your
   application's UI thread using
   :ref:`asynchronous transactions <java-async-api>`. That is,
   you can only use ``Realm`` methods whose name ends with the word
   ``Async`` in the main thread of your Android application unless you
   explicitly allow the use of synchronous methods.

   This restriction exists for the benefit of your application users:
   performing read and write operations on the UI thread can lead to
   unresponsive or slow UI interactions, so it's usually best to handle
   these operations either asynchronously or in a background thread.
   However, if your application requires the use of synchronous
   realm reads or writes on the UI thread, you can explicitly allow
   the use of synchronous methods with the following
   ``SyncConfiguration`` options:

   .. tabs-realm-languages::

      .. tab::
         :tabid: java

         .. literalinclude:: /examples/generated/java/sync/OpenARealmTest.snippet.allow-reads-writes-ui-thread.java
            :language: java
            :emphasize-lines: 2,3
            :copyable: false

      .. tab::
         :tabid: kotlin

         .. literalinclude:: /examples/generated/java/sync/OpenARealmTest.snippet.allow-reads-writes-ui-thread.kt
            :language: kotlin
            :emphasize-lines: 2,3
            :copyable: false
