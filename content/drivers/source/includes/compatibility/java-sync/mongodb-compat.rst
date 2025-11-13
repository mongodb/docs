The following table shows compatibility between the Java driver and {+mdb-server+}:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Java Driver Version
     - MongoDB 8.1
     - MongoDB 8.0
     - MongoDB 7.0
     - MongoDB 6.0
     - MongoDB 5.0
     - MongoDB 4.2

   * - 5.2 to 5.6
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 4.10 to 5.1
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓

   * - 4.8 to 4.9
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓

   * - 4.7
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓

   * - 4.3 to 4.6
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓

   * - 4.1 to 4.2
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓

   * - 4.0
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛

   * - 3.11 to 3.12
     - ✗ [#v3-note-sync]_
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛

   * - 3.8 to 3.10
     - ✗ [#v3-note-sync]_
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛

.. [#v3-note-sync] These driver versions are not compatible with MongoDB 8.1 or later because of an authentication issue. To learn more, see `Upgrade Driver Versions <https://www.mongodb.com/docs/drivers/java/sync/current/reference/upgrade/#std-label-java-server-8.1-incompatibility>`__.
