The following table shows compatibility between the Java Reactive Streams driver and Java.
Beginning with Java 8, the table lists only LTS versions, but the driver supports all
Java versions later than 8 because of the JVM backwards compatibility promise.

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Java Reactive Streams Driver Version
     - Java 21
     - Java 17
     - Java 11
     - Java 8
     - Java 7
     - Java 6

   * - 4.11 to 5.6
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -

   * - 4.5 to 4.10
     - ✓ [#virtual-threads-note-async]_
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

.. [#virtual-threads-note-async] This driver version is not compatible with virtual threads.