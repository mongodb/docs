.. include:: /includes/extracts/java-driver-compatibility-matrix-mongodb.rst

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Java Driver Version
     - MongoDB 4.4
     - MongoDB 4.2
     - MongoDB 4.0
     - MongoDB 3.6
     - MongoDB 3.4
     - MongoDB 3.2
     - MongoDB 3.0
     - MongoDB 2.6

   * - 4.2
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 4.1
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 4.0
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 3.12
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 3.11
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 3.10
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 3.9
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 3.8
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 3.7
     -
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 3.6
     -
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 3.5
     -
     -
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|


   * - 3.4
     -
     -
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|


   * - 3.3
     -
     -
     -
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 3.2
     -
     -
     -
     -
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|


   * - 3.1
     -
     -
     -
     -
     -
     -
     - |checkmark|
     - |checkmark|

   * - 3.0
     -
     -
     -
     -
     -
     -
     - |checkmark|
     - |checkmark|

   * - 2.14
     -
     -
     -
     -
     -
     - |checkmark|  [#driver-support]_
     - |checkmark|
     - |checkmark|

   * - 2.13
     -
     -
     -
     -
     -
     -
     - |checkmark|
     - |checkmark|

   * - 2.12
     -
     -
     -
     -
     -
     -
     -
     - |checkmark|

.. [#driver-support] The 2.14 driver does not support all MongoDB 3.2 features (e.g.,
   read concern); however, if you are currently on a version 2.x driver
   and would like to run against MongoDB 3.2 but cannot upgrade to driver
   version 3.2, use the 2.14 driver.
