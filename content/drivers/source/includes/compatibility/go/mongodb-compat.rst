The following table shows compatibility between the Go driver and {+mdb-server+}:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Go Driver Version
     - MongoDB 8.0
     - MongoDB 7.0
     - MongoDB 6.1
     - MongoDB 6.0
     - MongoDB 5.0
     - MongoDB 4.4
     - MongoDB 4.2

   * - 2.1 to 2.4
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 1.12 to 2.0
     - ⊛ [#8.0-support]_
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 1.11
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

.. [#8.0-support] Go driver v1.17 and v2.0 are partially compatible with {+mdb-server+} 8.0 but do not support client bulk write.
