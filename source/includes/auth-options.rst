You can specify the following authentication options after your
username as URI-style query parameters:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Connection Option
     - Description

   * - ``source``

     - Specify the name of the database which stores the user's
       credentials. If you do not specify this option, the |bi| will
       default to the current database associated with the MySQL
       connection.

       For authentication mechanisms such as ``PLAIN`` (LDAP) or
       ``GSSAPI`` (Kerberos) that delegate credential storage to other
       services, set the ``source`` value to ``$external``.

       Not required if :setting:`~security.defaultSource` is set in your
       |bi| :ref:`configuration file <config-format>`.

   * - ``mechanism``

     - Specify the mechanism that the |bi| should use to
       authenticate the connection. Accepted values include:

       - :ref:`SCRAM-SHA-1 <authentication-scram-sha-1>` (default)
       - :ref:`SCRAM-SHA-256 <authentication-scram-sha-256>`
       - :ref:`PLAIN <security-auth-ldap>` (LDAP SASL)
       - :ref:`GSSAPI <security-auth-kerberos>` (Kerberos)

       LDAP and Kerberos require `MongoDB Enterprise
       <https://www.mongodb.com/download-center/enterprise?ct=atlasheader2>`__.
       Set the source to ``$external`` when using LDAP or Kerberos.

       Not required if :setting:`~security.defaultMechanism` is set in your
       |bi| :ref:`configuration file <config-format>`.

       .. note:: 
          X.509 is not supported.
