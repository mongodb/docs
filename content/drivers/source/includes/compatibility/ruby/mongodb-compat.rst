The following table shows compatibility between the Ruby driver and {+mdb-server+}:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large no-padding

   * - Ruby Driver
     - MongoDB 8.0
     - MongoDB 7.0
     - MongoDB 6.0
     - MongoDB 5.0
     - MongoDB 4.4
     - MongoDB 4.2

   * - 2.21
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 2.19 to 2.20
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 2.18
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓
     - ✓

   * - 2.16 to 2.17
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓
     - ✓

   * - 2.14 to 2.15
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓
     - ✓

   * - 2.13
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓ [#ocsp]_
     - ✓

   * - 2.12
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓

   * - 2.11
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓ [#client-side-encryption]_

   * - 2.10
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ⊛
     - ✓ [#srv-polling]_ [#client-side-encryption]_

.. [#ocsp] OCSP verification is implemented as of driver version 2.14.
.. [#srv-polling] Polling of SRV records in sharded topologies is
   implemented as of driver version 2.11.
.. [#client-side-encryption] Client-side encryption is implemented as of
   driver version 2.12.