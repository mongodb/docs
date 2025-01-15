.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - {+java-rs+} Driver Version
     - Java 21
     - Java 17
     - Java 11 [#backwards-compatible-rs]_
     - Java 8
     - Java 7
     - Java 6

   * - 4.11 to 5.3
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -

   * - 4.5 to 4.10
     - ✓ [#virtual-threads-note]_
     - ✓
     - ✓
     - ✓
     -
     -

   * - 4.4
     -
     - ✓
     - ✓
     - ✓
     -
     -

   * - 4.1 to 4.3
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓

.. [#virtual-threads-note] This driver version is not compatible with virtual threads.
.. [#backwards-compatible-rs] Java versions 8 and above are all supported thanks to the JVM backwards compatibility promise. Only LTS versions will be explicitly listed in future.
