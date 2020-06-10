

.. tabs::
   :hidden:

   .. tab:: Username and Password
      :tabid: scramsha

      Type the name of the user authorized to access the this database.

      .. seealso::

         :ref:`SCRAM <authentication-scram>`

   .. tab:: X.509
      :tabid: x509

      Type the :rfc:`2253`\-formatted subject from the client
      certificate of the user authorized to access this database.

      .. seealso::

         :manual:`x.509 </tutorial/configure-x509-client-authentication>`

   .. tab:: Kerberos
      :tabid: kerberos

      Type the |upn| of the user authorized to access this database.

      .. seealso::

         :manual:`Kerberos </core/kerberos>`

   .. tab:: LDAP
      :tabid: ldap

      Type the name of the |ldap| user authorized to access this
      database.

      .. seealso::

         :manual:`LDAP </core/security-ldap>`
