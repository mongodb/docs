.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large no-padding

   * - {+driver-short+} Version
     - .NET 8
     - .NET 7
     - .NET 6 [#atlas-connection]_
     - .NET 4.8
     - .NET 4.7 [#2.14-note]_
     - .NET 4.6

   * - 2.14 to 2.26
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
   * - 2.13
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.12
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.11
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.10
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.9
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.8
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.7
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.6
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.5
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.4
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.3
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 2.2
     -
     -
     -
     - ✓
     - ✓
     - ✓
   * - 2.0
     -
     -
     -
     - ✓
     - ✓
     - ✓

Versions 1.10 and 1.11 of the driver are compatible with .NET 3.5
through 4.8 only.

.. [#atlas-connection] When using .NET 6, you can't connect to Atlas clusters running MongoDB 4.0 due to a certificate issue. This does not impact clusters running MongoDB 4.2+.

.. [#2.14-note] {+driver-short+} versions 2.14 or later requires .NET Framework 4.7.2 or
   later.

