.. sharedinclude:: dbx/compatibility-table-legend.rst

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - C Driver Version
     - MongoDB 8.0
     - MongoDB 7.0
     - MongoDB 6.0
     - MongoDB 5.0
     - MongoDB 4.4
     - MongoDB 4.2
     - MongoDB 4.0
     - MongoDB 3.6

   * - 1.28 to 2.0
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - 
   
   * - 1.24 to 1.27
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   
   * - 1.22 to 1.23
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   
   * - 1.19 1.21
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   
   * - 1.18
     - ⊛
     - ⊛
     - ⊛
     - ✓ [#c-1.18-driver-support]_
     - ✓
     - ✓
     - ✓
     - ✓
  
   * - 1.17
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
  
   * - 1.15 to 1.16
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
  
   * - 1.11 to 1.14
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
 
   * - 1.9 to 1.10
     -
     -
     -
     -
     -
     -
     -
     - ✓

.. [#c-1.18-driver-support] The 1.18 driver does not support snapshot reads
   on secondaries. For more information, see the
   `MongoDB Server version 5.0 release notes <https://www.mongodb.com/docs/v5.0/release-notes/5.0/#snapshots>`__.
