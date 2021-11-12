

.. tabs::
   :hidden:

   .. tab:: Username and Password
      :tabid: scramsha

      Type the name of the user authorized to access the this database.

      .. cond:: onprem

         .. include:: /includes/fact-configure-connections-to-app-db.rst

      To learn more about configuring SCRAM authentication, see 
      :ref:`SCRAM <authentication-scram>`.

   .. tab:: X.509
      :tabid: x509

      Type the :rfc:`2253`\-formatted subject from the client
      certificate of the user authorized to access this database.

      .. cond:: onprem

         .. include:: /includes/fact-configure-connections-to-app-db.rst

      To learn more about configuring x.509 authentication, see 
      :manual:`x.509 </tutorial/configure-x509-client-authentication>`.

   .. tab:: Kerberos
      :tabid: kerberos

      Type the |upn| of the user authorized to access this database.

      .. cond:: onprem

         .. include:: /includes/fact-configure-connections-to-app-db.rst

      To learn more about configuring Kerberos authentication, see 
      :manual:`Kerberos </core/kerberos>`.

   .. tab:: LDAP
      :tabid: ldap

      Type the name of the |ldap| user authorized to access this
      database.

      .. cond:: onprem

         .. include:: /includes/fact-configure-connections-to-app-db.rst

      To learn more about configuring LDAP authentication, see 
      :manual:`LDAP </core/security-ldap>`.
