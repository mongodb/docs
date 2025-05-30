.. list-table::
   :header-rows: 1
   :widths: 20 40

   * - Value

     - Description

   * - :ref:`SCRAM-SHA-1 <authentication-scram-sha-1>`

     - `RFC 5802 <https://tools.ietf.org/html/rfc5802>`__ standard
       Salted Challenge Response Authentication Mechanism using the SHA-1
       hash function.

   * - :ref:`SCRAM-SHA-256 <authentication-scram-sha-256>`

     - `RFC 7677 <https://tools.ietf.org/html/rfc7677>`__ standard
       Salted Challenge Response Authentication Mechanism using the SHA-256
       hash function.

       Requires featureCompatibilityVersion set to ``4.0``.

   * - :ref:`MONGODB-X.509 <security-auth-x509>`

     - MongoDB TLS/SSL certificate authentication.

   * - ``MONGODB-AWS``

     - External authentication using AWS IAM credentials for use in
       connecting to a
       `MongoDB Atlas <https://www.mongodb.com/cloud/atlas?tck=docs_server>`__
       cluster. See |mongodb-aws-example|.

       .. versionadded:: 100.1.0

   * - :ref:`GSSAPI <security-auth-kerberos>` (Kerberos)

     - External authentication using Kerberos. This mechanism is
       available only in `MongoDB Enterprise
       <http://www.mongodb.com/products/mongodb-enterprise-advanced?tck=docs_databasetools>`__.

   * - :ref:`PLAIN <security-auth-ldap>` (LDAP SASL)

     - External authentication using LDAP. You can also use ``PLAIN``
       for authenticating in-database users. ``PLAIN`` transmits
       passwords in plain text. This mechanism is available only in
       `MongoDB Enterprise
       <http://www.mongodb.com/products/mongodb-enterprise-advanced?tck=docs_databasetools>`__.
