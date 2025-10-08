The following table shows compatibility between the Node.js driver and {+mdb-server+}:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Node.js Driver Version
     - MongoDB 8.0
     - MongoDB 7.0
     - MongoDB 6.0
     - MongoDB 5.0
     - MongoDB 4.4
     - MongoDB 4.2

   * - 6.9 to 6.20
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 5.7 to 6.8
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 5.0 to 5.6
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓

   * - 4.8 to 4.17
     -
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓

   * - 4.0 to 4.7
     -
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓

   * - 3.7 [#3.7-note]_
     -
     - 
     - ⊛
     - ✓
     - ✓
     - ✓

   * - 3.6
     -
     - 
     - ⊛
     - ⊛
     - ✓
     - ✓

.. [#3.7-note] When using Node.js Driver version 3.7, you must set the ``useUnifiedTopology`` flag to ``true`` for certain features.
