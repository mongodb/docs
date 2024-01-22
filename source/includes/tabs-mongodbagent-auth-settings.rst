.. tabs::
   :hidden:

   .. tab:: SCRAM-SHA
      :tabid: scramsha

      .. list-table::
         :header-rows: 1
         :widths: 30 70

         * - Setting
           - Value

         * - :guilabel:`MongoDB Agent Username`
           - Enter the MongoDB Agent username.

         * - :guilabel:`MongoDB Agent Password`
           - Enter the password for MongoDB Agent Username.

   .. tab:: LDAP
      :tabid: ldap

      .. list-table::
         :header-rows: 1
         :widths: 30 70

         * - Setting
           - Value

         * - :guilabel:`MongoDB Agent LDAP Username`
           - Enter the |ldap| username.

         * - :guilabel:`MongoDB Agent LDAP Password`
           - Enter the password for MongoDB Agent's |ldap| Username.

         * - :guilabel:`MongoDB Agent LDAP Group DN`
           - Enter the Distinguished Name for the MongoDB Agent's
             |ldap| Group.

             .. note::

                Provide the MongoDB Agent's |ldap| Group
                :abbr:`DN (Distinguished Name)` only if you use |ldap|
                Authorization. Each MongoDB Agent should have and use
                its own |ldap| Group :abbr:`DN (Distinguished Name)`.

   .. tab:: Kerberos
      :tabid: kerberos

      The required values depend upon whether you are connecting to a
      Linux-served |kdc| or Windows Active Directory Server.

      .. tabs::

         .. tab:: Linux KDC
            :tabid: linux

            .. list-table::
               :header-rows: 1
               :widths: 30 70

               * - Setting
                 - Value

               * - :guilabel:`Monitoring Kerberos Principal`
                 - Kerberos Principal.

               * - :guilabel:`Monitoring Keytab Path`
                 - Absolute file Ppath to the MongoDB Agent's Keytab.

               * - :guilabel:`Monitoring LDAP Group DN`
                 - Enter the Distinguished Name for the MongoDB Agent's
                   |ldap| Group.

                   The |ldap| Group DN is then created as a role in
                   MongoDB to grant the MongoDB Agent the appropriate
                   privileges.

                   .. note::

                      You only need to provide the LDAP Group DN if
                      you use LDAP Authorization.

         .. tab:: Windows Active Directory
            :tabid: windows

            .. list-table::
               :header-rows: 1
               :widths: 30 70

               * - Setting
                 - Value

               * - :guilabel:`MongoDB Agent Username`
                 - Active Directory user name.

               * - :guilabel:`MongoDB Agent Password`
                 - Active Directory password.

               * - :guilabel:`Domain`

                 - NetBIOS name of a domain in Active Directory
                   Domain Services. Must be in all capital letters.

   .. tab:: X.509
      :tabid: x509

      .. list-table::
         :header-rows: 1
         :widths: 30 70

         * - Setting
           - Value

         * - :guilabel:`MongoDB Agent Username`
           - Enter the |ldap|\v3 distinguished name derived from the
             MongoDB Agent's |pem| Key file.

         * - :guilabel:`TLS/SSL CA File Path`
           - The path on disk that contains the trusted certificate
             authority (CA) certificates in |pem| format. These certificates
             verify the server certificate returned from any MongoDB
             instances running with |tls-ssl|. You must enter at least one
             |tls-ssl| CA file path.

         * - :guilabel:`MongoDB Agent PEM Key file`
           - If your MongoDB deployment requires client certificates, on
             the line for the appropriate operating system, provide the
             path and ``.pem`` filename for the client certificate used by
             the MongoDB Agent's |pem| Key file on the server.
             You must enter a value for at least one MongoDB Agent PEM
             Key File.

         * - :guilabel:`MongoDB Agent PEM Key Password`
           - Provide the password to the |pem| Key file if it was
             encrypted.

         * - :guilabel:`MongoDB Agent LDAP Group DN`
           - Enter the Distinguished Name for the MongoDB Agent's
             |ldap| Group.

             .. note::
              
                You only need to provide MongoDB Agent's |ldap| Group
                DN if you use |ldap| Authorization.
