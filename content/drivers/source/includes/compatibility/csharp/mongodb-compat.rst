The following table shows compatibility between the .NET/C# driver and {+mdb-server+}:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - .NET/C# Driver Version
     - MongoDB 8.1
     - MongoDB 8.0
     - MongoDB 7.0
     - MongoDB 6.0
     - MongoDB 5.0
     - MongoDB 4.4
     - MongoDB 4.2 

   * - 2.29 to 3.6
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 2.20 to 2.28
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 2.16 to 2.19
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓

   * - 2.15
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓

   * - 2.7 to 2.14
     - ✗ [#8.1-note]_
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓

   * - 2.0 to 2.6
     - ✗ [#8.1-note]_
     -
     -
     -
     -
     -
     - ✓

.. [#8.1-note] These driver versions are not compatible with {+mdb-server+} 8.1 or later because of an authentication issue.