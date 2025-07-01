.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - authzQueryTemplate
     - string
     - Optional
     - |ldap| query template that |service| executes to obtain the
       |ldap| groups to which the authenticated user belongs. This
       parameter applies only for user authorization. Use the
       **{USER}** placeholder in the |url| to substitute the
       authenticated username. The query executes on a path relative to
       the host specified with **hostname**. The formatting for the
       query must conform to :rfc:`RFC 4515 <4515>` and
       :rfc:`RFC 4516 <4516>`. This parameter uses the default value of
       **{USER}?memberOf?base**.

       .. tip::

          Pass an empty string to delete a previously assigned value:

          .. code-block:: json

             "authzQueryTemplate": ""      

   * - bindPassword
     - string
     - Required
     - Password used to authenticate the **bindUsername**.

   * - caCertificate
     - string
     - Optional
     - |certauth| certificate used to verify the identify of the |ldap|
       server. You may use self-signed certificates.

       .. tip::

          Pass an empty string to delete a previously assigned value:

          .. code-block:: json

             "caCertificate": ""

   * - ldap
     - object
     - Required
     - List of settings that configures |ldap| over |tls| for one
       |service| project.

   * - ldap.authenticationEnabled
     - boolean
     - Required
     - Specifies whether user authentication with |ldap| is enabled.

   * - ldap.authorizationEnabled
     - boolean
     - Optional
     - Specifies whether user authorization with |ldap| is enabled.
       You cannot enable user authorization with |ldap| without first
       enabling user authentication with |ldap|.

   * - ldap.bindUsername
     - string
     - Required
     - User DN that |service| uses to connect to the |ldap| server.
       Write in the format of a full DN:

       .. code-block:: text

          CN=BindUser,CN=Users,DC=my|ldapserver|,DC=mycompany,DC=com

   * - ldap.hostname
     - string
     - Required
     - |fqdn| or IP address of the host that serves the |ldap|
       directory. This host must be visible to the internet or
       connected to your |service| cluster with :doc:`VPC Peering
       </security-vpc-peering>`.

   * - ldap.port
     - integer
     - Required
     - Port to which the |ldap| server listens for client connections.
       This parameter use a default value of **636**.

   * - ldap.userToDNMapping
     - array
     - Required
     - Maps an |ldap| username for authentication to an |ldap|
       Distinguished Name (DN). Each document contains a **match**
       regular expression and either a **substitution** or
       **ldapQuery** template used to transform the |ldap| username
       extracted from the regular expression. |service| steps through
       the each document in the array in the given order, checking the
       authentication username against the **match** filter. If a match
       is found, |service| applies the transformation and uses the
       output to authenticate the user. |service| does not check the
       remaining documents in the array. To learn more, see
       :setting:`security.ldap.userToDNMapping`.

       The following example provides a **match** regular expression
       that matches all users and substitutes the username into the
       **{0}** argument of the **substitution** template to create an
       |ldap| DN.

       .. code-block:: json

          "userToDNMapping": [
            {
             "match":"(.*)",
             "substitution":"CN={0},CN=Users,DC=my-atlas-ldap-server,DC=myteam,DC=com"
            }
          ]

   * - ldap.userToDNMapping[i].match
     - string
     - Required
     - Regular expression to match against a provided |ldap| username.
       Each parenthesis-enclosed section represents a
       `regular expression capture group <http://www.regular-expressions.info/refcapture.html>`_ that the
       **substitution** or **ldapQuery** template can use.


   * - ldap.userToDNMapping[i].substitution
     - string
     - Required
     - |ldap| Distinguished Name (DN) formatting template that converts
       the |ldap| name matched by the **match** regular expression into
       an |ldap| Distinguished Name.  |service| replaces each numeric
       value with the corresponding
       `regular expression capture group <http://www.regular-expressions.info/refcapture.html>`_
       extracted from the |ldap| username that matched the **match**
       regular expression.

       .. example::

          .. code-block:: text

             "substitution":"CN={0},CN=Users,DC=my-atlas-ldap-server,DC=myteam,DC=com"``

       Each document in the **ldap.userToDNMapping.match** array must
       contain either a **substitution** or **ldapQuery** field, but
       not both.

   * - ldap.userToDNMapping[i].ldapQuery
     - string
     - Required
     - |ldap| query formatting template that inserts the |ldap| name
       matched by the **match** regular expression into an |ldap| query
       |uri|. The formatting for the query must conform to
       :rfc:`RFC 4515 <4515>` and :rfc:`RFC 4516 <4516>`. |service| replaces each numeric value with the corresponding
       `regular expression capture group <http://www.regular-expressions.info/refcapture.html>`_
       extracted from the |ldap| username that matched the **match**
       regular expression.

       .. example::

          .. code-block:: text

             "ou=engineering,dc=example, dc=com??one?(user={0})"


       Each document in the **ldap.userToDNMapping.match** array must
       contain either a **substitution** or **ldapQuery** field, but
       not both.
