.. tabs::
   :hidden:

   .. tab:: Username and Password
      :tabid: scramsha

      Type the password associated with the username that can access
      this database.

      .. include:: /includes/fact-configure-connections-to-app-db.rst

      To learn more about configuring SCRAM authentication, see 
      :ref:`SCRAM <authentication-scram>`.

   .. tab:: X.509
      :tabid: x509

      Leave it blank.

      .. include:: /includes/fact-configure-connections-to-app-db.rst

      To learn more about configuring x.509 authentication, see 
      :ref:`x.509 <x509-client-authentication>`.

   .. tab:: Kerberos
      :tabid: kerberos

      Kerberos retrieves the password from its
      :doc:`keytab file 
      </tutorial/enable-kerberos-authentication-for-group/>`.
      Don't type a password into this field.

      .. include:: /includes/fact-configure-connections-to-app-db.rst

      To learn more about configuring Kerberos authentication, see 
      :ref:`Kerberos <security-kerberos>`.

   .. tab:: LDAP
      :tabid: ldap

      Type the password of the |ldap| user authorized to access this
      database.

      .. include:: /includes/fact-configure-connections-to-app-db.rst

      To learn more about configuring LDAP authentication, see
      :ref:`LDAP <security-ldap>`.
