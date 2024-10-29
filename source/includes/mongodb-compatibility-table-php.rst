.. Full compatibility table, for reference only. 

.. sharedinclude:: dbx/compatibility-table-legend.rst

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - PHP Driver Versions
     - MongoDB 8.0
     - MongoDB 7.0
     - MongoDB 6.0
     - MongoDB 5.0
     - MongoDB 4.4
     - MongoDB 4.2
     - MongoDB 4.0
     - MongoDB 3.6
     - MongoDB 3.4
     - MongoDB 3.2
     - MongoDB 3.0
     - MongoDB 2.6

   * - ext + lib 1.20
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -
     -
     -

   * - ext + lib 1.16 to 1.19
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -
     -

   * - ext + lib 1.15 [#PHP1.15-version-parity]_
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -
     -

   * - ext 1.14 + lib 1.13
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -
     -

   * - ext 1.13 + lib 1.12
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -
     -

   * - ext 1.12 + lib 1.11
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - ext 1.11 + lib 1.10
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - ext 1.10 + lib 1.9
     - ⊛
     - ⊛
     - ⊛
     - ✓ [#PHPC1.10-PHPLIB1.9-driver-support]_
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - ext 1.9 + lib 1.8
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - ext 1.8 + lib 1.7
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - ext 1.7 + lib 1.6
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - ext 1.6 + lib 1.5
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - ext 1.5 + lib 1.4
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - ext 1.4 + lib 1.3
     -
     -
     -
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - ext 1.3 + lib 1.2
     -
     -
     -
     -
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓

   * - ext 1.2 + lib 1.1
     -
     -
     -
     -
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓

   * - ext 1.1 + lib 1.0
     -
     -
     -
     -
     -
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓

   * - ext 1.0
     -
     -
     -
     -
     -
     -
     -
     -
     -
     -
     - ✓
     - ✓

.. [#PHP1.15-version-parity] Version 1.14 of the MongoDB PHP library has been 
   skipped to restore version parity between the library and extension.

.. [#PHPC1.10-PHPLIB1.9-driver-support] The extension 1.10 + library 1.9
   driver does not support snapshot reads on secondaries. For more
   information, see the
   `MongoDB Server version 5.0 release notes <https://www.mongodb.com/docs/v5.0/release-notes/5.0/#snapshots>`__.
