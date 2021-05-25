.. tabs::
   :hidden:

   .. tab:: SCRAM-SHA
      :tabid: scramsha

      .. list-table::
         :header-rows: 1
         :widths: 30 70

         * - Setting
           - Value

         * - :guilabel:`Backup Username`
           - Enter the Backup username.

         * - :guilabel:`Backup Password`
           - Enter the password for Backup Username.

   .. tab:: LDAP
      :tabid: ldap

      .. list-table::
         :header-rows: 1
         :widths: 30 70

         * - Setting
           - Value

         * - :guilabel:`Backup LDAP Username`
           - Enter the |ldap| username.

         * - :guilabel:`Backup LDAP Password`
           - Enter the password for Backup's |ldap| Username.

         * - :guilabel:`Backup LDAP Group DN`
           - Enter the Distinguished Name for the Backup's |ldap|
             Group.

             .. note::

                Provide the Backup's |ldap| Group
                :abbr:`DN (Distinguished Name)` only if you use |ldap|
                Authorization. Each Backup should have and use its
                own |ldap| Group :abbr:`DN (Distinguished Name)`.

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
                 - Absolute file Ppath to the Backup's Keytab.

               * - :guilabel:`Monitoring LDAP Group DN`
                 - Enter the Distinguished Name for the Backup's |ldap|
                   Group.

                   The |ldap| Group DN is then created as a role in
                   MongoDB to grant the Backup the appropriate
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

               * - :guilabel:`Backup Username`
                 - Active Directory user name.

               * - :guilabel:`Backup Password`
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

         * - :guilabel:`Backup Username`
           - Enter the |ldap|\v3 distinguished name derived from the
             Backup's |pem| Key file.

         * - :guilabel:`Backup PEM Key file`
           - Provide the path and filename for the Backup's |pem| Key
             file on the server on the line for the appropriate
             operating system.

         * - :guilabel:`Backup PEM Key Password`
           - Provide the password to the |pem| Key file if it was
             encrypted.

         * - :guilabel:`Backup LDAP Group DN`
           - Enter the Distinguished Name for the Backup's |ldap|
             Group.

             .. note::
                You only need to provide Backup's |ldap| Group DN if
                you use |ldap| Authorization.
