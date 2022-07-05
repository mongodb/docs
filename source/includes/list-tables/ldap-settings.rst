.. list-table::
   :widths: 45 10 20 25
   :header-rows: 1

   * - Key
     - Type and necessity
     - Description
     - Example

   * - | ``spec.security``
       | :setting:`.authentication.enabled<spec.security.authentication.enabled>`
     - | boolean,
       | required
     - Set to ``true`` to enable LDAP authentication.
     - ``true``

   * - | ``spec.security``
       | :setting:`.authentication.ldap.bindQueryUser<spec.security.authentication.ldap.bindQueryUser>`
     - | string,
       | required
     - Specify the LDAP Distinguished Name to which MongoDB binds when
       connecting to the LDAP server.
     - ``cn=admin,dc=example,dc=org``

   * - | ``spec.security``
       | :setting:`.authentication.ldap.bindQueryPasswordSecretRef<spec.security.authentication.ldap.bindQueryPasswordSecretRef.name>`
     - | string,
       | required
     - Specify the name of the |k8s-secret| that contains the
       LDAP Bind Distinguished Name's password with which MongoDB binds
       when connecting to an LDAP server.
     - ``<secret-name>``

   * - | ``spec.security``
       | :setting:`.authentication.ldap.caConfigMapRef.name<spec.security.authentication.ldap.caConfigMapRef.name>`
     - | string,
       | optional
     - Add the |k8s-configmap|\'s name that stores the custom |certauth|
       that you used to sign your deployment's |tls| certificates.
     - ``<configmap-name>``

   * - | ``spec.security``
       | :setting:`.authentication.ldap.caConfigMapRef.key<spec.security.authentication.ldap.caConfigMapRef.key>`
     - | string,
       | optional
     - Add the field name that stores the |certauth| which validates the
       LDAP server's |tls| certificate.
     - ``<configmap-key>``

   * - | ``spec.security``
       | :setting:`.authentication.ldap.servers<spec.security.authentication.ldap.servers>`
     - | array of strings,
       | required
     - Specify the list of ``hostname:port`` combinations of one or more
       LDAP servers. For each server, use a separate line.
     - ``<example.com:636>``

   * - | ``spec.security``
       | :setting:`.authentication.ldap.transportSecurity<spec.security.authentication.ldap.transportSecurity>`
     - | string,
       | optional
     - Set to ``tls`` to use LDAPS (LDAP over |tls|). Leave blank if your
       LDAP server doesn't accept TLS.
     - ``tls``

   * - | ``spec.security``
       | :setting:`.authentication.ldap.userToDNMapping<spec.security.authentication.ldap.userToDNMapping>`
     - | string,
       | required
     - Specify the mapping that maps the username provided to
       :binary:`~bin.mongod` or :binary:`~bin.mongos` for authentication
       to an LDAP Distinguished Name (DN).

       To learn more, see :manual:`security.ldap.userToDNMapping
       </reference/configuration-options/#security.ldap.userToDNMapping>`
       and :manual:`LDAP Query Templates
       </core/security-ldap-external/#ldap-query-template>` in the
       MongoDB Server documentation.
     - ``<match: "(.+)",substitution: "uid={0},ou=groups,dc=example,dc=org">``

   * - | ``spec.security``
       | :setting:`.authentication.modes<spec.security.authentication.modes>`
     - | string,
       | required
     - Set to ``LDAP`` to enable authentication through LDAP.
     - ``LDAP``

   * - | ``spec.security``
       | :setting:`.certsSecretPrefix<spec.security.certsSecretPrefix>`
     - | string,
       | optional
     - Add the ``<prefix>`` of the secret name that contains your
       MongoDB deployment's |tls| certificates.

       .. include:: /includes/fact-example-secret-prefix-cluster-file.rst
     - ``devDb``

   * - | ``spec.security``
       | :setting:`.tls.ca<spec.security.tls.ca>`
     - | string,
       | optional
     - Add the |k8s-configmap|\'s name that stores the custom |certauth|
       that you used to sign your deployment's |tls| certificates.
     - ``<custom-ca>``
