.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - {+java-rs} Driver Version
     - MongoDB 8.0
     - MongoDB 7.0
     - MongoDB 6.0

   * - 5.2 to 5.5
     - ✓
     - ✓
     - ✓
     - ✓

   * - 4.10 to 5.1
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
     - ✗ [#v3-note]_
     - ⊛
     - ⊛
     - ⊛

.. [#v3-note] These driver versions are not compatible with MongoDB 8.1 or later because of an authentication issue. To learn more, see :ref:`java-rs-server-8.1-incompatibility`.
