.. tabs::

   tabs:
     - id: userpwd
       name: Username/Password
       content: |

         The following values are displayed when you select
         :guilabel:`Username/Password (MONGODB-CR/SCRAM-SHA-1/SCRAM-SHA-256)`
         from the :guilabel:`Auth Mechanism` menu.

         .. list-table::
            :widths: 20 10 10 50 10
            :stub-columns: 1
            :header-rows: 1

            * - Field
              - Data Type
              - Necessity
              - Action
              - Default

            * - Username
              - String
              - Required
              - Type the username of the {+mdbagent+} user in your
                application database.
              - None

            * - Password
              - String
              - Required
              - Type the password of the {+mdbagent+} user in your
                application database.
              - None

     - id: kerberos
       name: Kerberos
       content: |

         The following values are displayed when you select
         :guilabel:`Kerberos (GSSAPI)` from the
         :guilabel:`Auth Mechanism` menu.

         .. tabs::

            tabs:
              - id: linux
                name: Linux
                content: |

                  .. list-table::
                     :widths: 20 10 10 50 10
                     :stub-columns: 1
                     :header-rows: 1

                     * - Field
                       - Data Type
                       - Necessity
                       - Action
                       - Default

                     * - Principal
                       - String
                       - Required
                       - Type in the |upn| for the {+mdbagent+}
                         MongoDB user that has access to this MongoDB
                         deployment.
                       - None

                     * - Keytab Path
                       - String
                       - Required
                       - Type in the absolute path to the Kerberos
                         Keytab file generated for the {+mdbagent+}
                         |upn|.
                       - None

              - id: windows
                name: Windows
                content: |

                  .. list-table::
                     :widths: 20 10 10 50 10
                     :stub-columns: 1
                     :header-rows: 1

                     * - Field
                       - Data Type
                       - Necessity
                       - Action
                       - Default

                     * - {+mdbagent+} Username
                       - String
                       - Required
                       - Type in the username for the {+mdbagent+}
                         MongoDB user that has access to this MongoDB
                         deployment.
                       - None

                     * - {+mdbagent+} Password
                       - String
                       - Required
                       - Type in the password for the {+mdbagent+}
                         MongoDB user that has access to this MongoDB
                         deployment.
                       - None

                     * - Domain
                       - String
                       - Required
                       - Type in the Active Directory domain to which
                         the {+mdbagent+} username authenticates.
                       - None

                     * - |sasl| Service Name
                       - String
                       - Required
                       - Type in the |sasl| service name used for this
                         MongoDB deployment.
                       - mongodb

                     * - {+mdbagent+} Group |dn|
                       - String
                       - Optional
                       - Type the name of the Group |dn| in which the
                         {+mdbagent+} user belongs. This value is
                         needed if the MongoDB deployment uses |ldap|
                         authorization.
                       - None

     - id: ldap
       name: LDAP
       content: |

         The following values are displayed when you select
         :guilabel:`LDAP (PLAIN)` from the :guilabel:`Auth Mechanism`
         menu.

         .. list-table::
            :widths: 20 10 10 50 10
            :stub-columns: 1
            :header-rows: 1

            * - Field
              - Data Type
              - Necessity
              - Action
              - Default

            * - Username
              - String
              - Required
              - Type the username of the {+mdbagent+} user in your
                |ldap| directory.
              - None

            * - Password
              - String
              - Required
              - Type the password of the {+mdbagent+} user in your
                |ldap| directory.
              - None

            * - {+mdbagent+} Group |dn|
              - String
              - Optional
              - Type the name of the Group |dn| in which the
                {+mdbagent+} user belongs. This value is needed if the
                MongoDB deployment uses |ldap| authorization.
              - None

     - id: x509
       name: X.509
       content: |

         The following values are displayed when you select
         :guilabel:`X.509 Client Certificate (MONGODB-X509)` from the
         :guilabel:`Auth Mechanism` menu.

         .. note::
          
            If you choose :guilabel:`X.509 Client Certificate (MONGODB-X509)`, you *must* enable |tls|.

         .. list-table::
            :widths: 20 10 10 50 10
            :stub-columns: 1
            :header-rows: 1

            * - Field
              - Data Type
              - Necessity
              - Action
              - Default

            * - {+mdbagent+} Username
              - String
              - Required
              -
              - None

            * - {+mdbagent+} Group |dn|
              - String
              - Optional
              - Type the name of the Group |dn| in which the
                {+mdbagent+} user belongs. This value is needed if the
                MongoDB deployment uses |ldap| authorization.
              - None
