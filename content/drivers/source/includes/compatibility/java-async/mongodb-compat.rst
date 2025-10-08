The following table shows compatibility between the Java Reactive Streams driver and
{+mdb-server+}:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Java Reactive Streams Driver Version
     - MongoDB 8.1
     - MongoDB 8.0
     - MongoDB 7.0
     - MongoDB 6.0

   * - 5.2 to 5.6
     - ✓
     - ✓
     - ✓
     - ✓

   * - 4.10 to 5.1
     - ⊛
     - ⊛
     - ✓
     - ✓

   * - 4.7 to 4.9
     - ⊛
     - ⊛
     - ⊛
     - ✓

   * - 4.0 to 4.6
     - ⊛
     - ⊛
     - ⊛
     - ⊛

   * - 3.11 to 3.12
     - ✗ [#v3-note-async]_
     - ⊛
     - ⊛
     - ⊛

.. [#v3-note-async] These driver versions are not compatible with MongoDB 8.1 or later because of an authentication issue. To learn more, see `Upgrade Driver Versions <https://www.mongodb.com/docs/languages/java/reactive-streams-driver/current/upgrade/#server-version-8.1-support-changes>`__.
