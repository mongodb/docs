.. list-table::
   :header-rows: 1
   :widths: 20 40

   * - Value

     - Description

   * - :ref:`SCRAM-SHA-1 <authentication-scram-sha-1>`

     - `RFC 5802 <https://tools.ietf.org/html/rfc5802>`_ standard
       Salted Challenge Response Authentication Mechanism using the SHA1
       hash function.

   * - :ref:`SCRAM-SHA-256 <authentication-scram-sha-256>`

     - *New in version 2.6:* `RFC 7677 <https://tools.ietf.org/html/rfc7677>`_
       standard Salted Challenge Response Authentication Mechanism using
       the SHA2 hash function.

   * - :ref:`PLAIN <security-auth-ldap>` (LDAP SASL)

     - External authentication using LDAP. You can also use ``PLAIN``
       for authenticating in-database users. ``PLAIN`` transmits
       passwords in plain text. This mechanism is available only in
       `MongoDB Enterprise
       <http://www.mongodb.com/products/mongodb-enterprise?jmp=docs>`_.
