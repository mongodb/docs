To configure :binary:`~bin.mongod` to require SSL for incoming
connections, modify your configuration file as follows:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Option
     - Value

   * - :manual:`net.ssl.mode </reference/configuration-options/#net.ssl.mode>`
     - ``requireSSL``

   * - :manual:`net.ssl.PEMKeyFile </reference/configuration-options/#net.ssl.PEMKeyFile>`
     - ``C:\<path-to-file>\mdb.pem``

   * - :manual:`net.ssl.CAFile </reference/configuration-options/#net.ssl.CAFile>`
     - ``C:\<path-to-file>\mdbca.crt``

   * - :manual:`net.ssl.clusterFile </reference/configuration-options/#net.ssl.clusterFile>`
     - ``C:\<path-to-file>\mdb.pem``

   * - :manual:`security.clusterAuthmode </reference/configuration-options/#security.clusterAuthMode>`
     - ``x509``

The following example configuration file contains directives for
SSL connections and :manual:`x.509 </core/security-x.509>`
authentication.

.. note::

   The following is an example ``mongod`` configuration file. Your
   configuration file may require additional or different options.
