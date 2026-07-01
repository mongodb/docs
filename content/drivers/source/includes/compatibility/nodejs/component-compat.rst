The following table describes add-on component version compatibility for
the Node.js driver. The table uses `caret ranges
<https://docs.npmjs.com/cli/v6/using-npm/semver#caret-ranges-123-025-004>`__
(``^``) to denote compatible versions. If a cell is empty, the driver
version isn't compatible with the component.

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large
   :widths: 12 9 13 10 13 13 10 10 10

   * - Node.js Driver Version
     - bson
     - bson-ext [1]_
     - @mongodb-js/kerberos
     - mongodb-client-encryption
     - @mongodb-js/zstd
     - @aws-sdk/credential-providers
     - gcp-metadata
     - socks

   * - 7.x
     - ^7.0.0
     -
     - ^7.0.0
     - ^7.0.0
     - ^7.0.0
     - ^3.806.0
     - ^7.0.1
     - ^2.8.6

   * - 6.x
     - ^6.0.0
     -
     - ^2.0.1
     - ^6.0.0
     - ^1.1.0
     -
     -
     -
     
   * - 5.x
     - ^5.0.0
     -
     - ^1.0.0 or ^2.0.0
     - ^2.3.0
     - ^1.0.0
     -
     -
     -

   * - 4.x
     - ^4.0.0
     - ^4.0.0
     - ^1.0.0 or ^2.0.0
     - ^1.0.0 or ^2.0.0
     - ^1.0.0
     -
     -
     -
  
   * - 3.x
     - ^1.0.0
     - ^1.0.0 or ^2.0.0
     - ^1.0.0
     - ^1.0.0
     -
     -
     -
     -

.. [1] Driver versions 5.x and later don't support ``bson-ext``. Use
   ``bson`` instead.