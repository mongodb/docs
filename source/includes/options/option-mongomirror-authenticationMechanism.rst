.. option:: --authenticationMechanism <authenticationMechanism>

   The authentication mechanism to use to authenticate the user to the
   source replica set.
   
   .. list-table::
      :header-rows: 1
      :widths: 20 40
   
      * - Value
   
        - Description
   
      * - :ref:`SCRAM-SHA-1 <authentication-scram-sha-1>`
   
        - `RFC 5802 <https://tools.ietf.org/html/rfc5802>`_ standard
          Salted Challenge Response Authentication Mechanism using the SHA1
          hash function.
   
      * - :ref:`MONGODB-CR <4.0-mongodb-cr>`
   
        - MongoDB challenge/response authentication.
   
      * - :ref:`MONGODB-X509 <security-auth-x509>`
   
        - MongoDB TLS/SSL certificate authentication.
   
      * - :ref:`GSSAPI <security-auth-kerberos>` (Kerberos)
   
        - External authentication using Kerberos. This mechanism is
          available only in `MongoDB Enterprise
          <http://www.mongodb.com/products/mongodb-enterprise?tck=docs_atlas>`_.
   
      * - :ref:`PLAIN <security-auth-ldap>` (LDAP SASL)
   
        - External authentication using LDAP. You can also use ``PLAIN``
          for authenticating in-database users. ``PLAIN`` transmits
          passwords in plain text. This mechanism is available only in
          `MongoDB Enterprise
          <http://www.mongodb.com/products/mongodb-enterprise?tck=docs_atlas>`_.
   

