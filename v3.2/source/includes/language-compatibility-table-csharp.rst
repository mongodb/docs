.NET
~~~~

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large no-padding

   * - {+driver-short+} Version
     - .NET 8
     - .NET 7
     - .NET 6 [#atlas-connection]_
     - .NET 5
     - .NET Core 3.X
     - .NET Core 2.X

   * - 3.0 to 3.2
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - 

   * - 2.3 to 2.30
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

.. [#atlas-connection] When using .NET 6, you can't connect to Atlas clusters running MongoDB 4.0 due to a certificate issue. This does not impact clusters running MongoDB 4.2+.

.NET Framework
~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large no-padding

   * - {+driver-short+} Version
     - .NET 4.8
     - .NET 4.7 [#2.14-note]_
     - .NET 4.6

   * - 3.0 to 3.2
     - ✓
     - ✓
     - 
   
   * - 2.13 to 2.30
     - ✓
     - ✓
     - 

   * - 2.0 to 2.13
     - ✓
     - ✓
     - ✓

.. [#2.14-note] {+driver-short+} versions 2.14 or later requires .NET Framework 4.7.2 or
   later.