.. list-table::
   :widths: 15 10 75
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``ldap``
     - object
     - |ldap| configuration for an |service| project. To learn more
       about |ldap| configuration options, see 
       :doc:`Get Current LDAP Configuration </reference/api/ldaps-configuration-get-current>`.

   * - ``customerX509``
     - object
     - Customer-managed X.509 configuration for an |service| project.

   * - ``customerX509.cas``
     - string
     - PEM string containing one or more customer CAs for 
       database user authentication.