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
     - MongoDB 4.0

   * - 2.21
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 2.19 to 2.20
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 2.18
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 2.17
     -
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 2.16
     -
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 2.14 to 2.15
     -
     -
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 2.13
     -
     -
     -
     -
     - |checkmark| [#ocsp]_
     - |checkmark|
     - |checkmark|

   * - 2.12
     -
     -
     -
     -
     -
     - |checkmark|
     - |checkmark|

   * - 2.11
     -
     -
     -
     -
     -
     - |checkmark| [#client-side-encryption]_
     - |checkmark|

   * - 2.10
     -
     -
     -
     -
     -
     - |checkmark| [#srv-polling]_ [#client-side-encryption]_
     - |checkmark|

   * - 2.6 to 2.9
     -
     -
     -
     -
     -
     -
     - |checkmark|

.. [#ocsp] OCSP verification is implemented as of driver version 2.14.
.. [#srv-polling] Polling of SRV records in sharded topologies is
   implemented as of driver version 2.11.
.. [#client-side-encryption] Client-side encryption is implemented as of
   driver version 2.12.

.. include:: /includes/unicode-checkmark.rst