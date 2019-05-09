The authentication to use if the ``mongod`` instance
requires authentication. Select your authentication
method from the tabs below for specific instructions:

.. tabs::

   tabs:
     - id: username-pw
       name: Username / Password
       content: |
         Select :guilabel:`Username / Password` if the ``mongod``
         instance uses either MongoDB-CR or :manual:`SCRAM-SHA-1
         </core/security-scram/>` as its authentication mechanism. If
         selected, you must provide the :guilabel:`Username`,
         :guilabel:`Password`, and :manual:`Authentication Database
         </core/security-users/#user-authentication-database>` to
         authenticate the user.

         .. note::

            Starting in MongoDB version 4.0, MongoDB removes support
            for the deprecated MongoDB Challenge-Response
            (``MONGODB-CR``) authentication mechanism.

     - id: scram-sha-256
       name: SCRAM-SHA-256
       content: |
         Select :guilabel:`SCRAM-SHA-256` if the ``mongod`` instance
         uses :manual:`SCRAM-SHA-256 </core/security-scram/>` as its
         authentication mechanism (*New in MongoDB 4.0*). If selected,
         you must provide the :guilabel:`Username`,
         :guilabel:`Password`, and :manual:`Authentication Database
         </core/security-users/#user-authentication-database>` to
         authenticate the user.

         For more information on the ``SCRAM``
         authentication mechanism, see :manual:`SCRAM
         </manual/core/security-scram/>`.

     - id: kerberos
       name: Kerberos
       content: |

         .. important::

            :guilabel:`Kerberos` Authentication is not available in
            Compass Community Edition.

         Select :guilabel:`Kerberos` if the ``mongod`` instance uses
         :manual:`Kerberos </core/kerberos/>` as its authentication
         mechanism. If selected, you must provide the
         :manual:`Principal </core/kerberos/#principals>`,
         :guilabel:`Password`, and :guilabel:`Service Name` to
         authenticate the user.

         You can also direct |compass| to
         :guilabel:`Canonicalize the Host Name` by setting the
         corresponding toggle. When you enable this setting,
         Kerberos uses the canonicalized form of the
         host name (``cname``) when constructing the principal for
         |compass|.

         For more information on principal name canonicalization
         in Kerberos, see `this document
         <https://tools.ietf.org/html/rfc6806.html>`__.

     - id: ldap
       name: LDAP
       content: |
         .. important::

            :guilabel:`LDAP` Authentication is not available in
            Compass Community Edition.

         Select :guilabel:`LDAP` if the ``mongod`` instance uses
         :manual:`LDAP </core/security-ldap-external/>` as its
         authentication mechanism. If selected, you must provide the
         :guilabel:`Username` and :guilabel:`Password` to authenticate
         the user.

     - id: x509
       name: X.509
       content: |
         .. important::

            :guilabel:`x.509` Authentication is not available in
            Compass Community Edition.

         Select :guilabel:`X.509` if the ``mongod`` instance uses
         :manual:`X.509 </core/security-x.509/>` as its authentication
         mechanism. If selected, you must provide the
         :guilabel:`Username` to authenticate the user.

For MongoDB permissions required to access |compass-short|,
see :ref:`required-access`.
