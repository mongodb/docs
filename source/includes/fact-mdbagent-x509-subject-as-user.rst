For the MongoDB Agent to connect to your MongoDB deployment, you must create a MongoDB user on your deployment that corresponds to the ``subject`` value of your client certificate.

Where you create the MongoDB user depends upon whether or not you are
using :manual:`LDAP authorization </core/security-ldap-external>`.

.. tabs::

   .. tab:: LDAP Authorization
      :tabid: ldap-auth-x509

      If you are using |ldap| authorization in your MongoDB deployment,
      you must create an |ldap| user and |ldap| group for the
      {+mdbagent+} on the |ldap| server. After creating the |ldap| user
      and group, map the |ldap| group to a MongoDB role in your
      deployment's ``admin`` database.

      .. warning::

         When using |ldap| Authorization, do not create *any* MongoDB
         users in the ``$external`` database. MongoDB 3.4 and later
         does not start if a MongoDB user exists in the ``$external``
         database and |ldap| authorization is enabled.

      For the MongoDB user representing the {+mdbagent+}:

      #. Create a new |ldap| user on your |ldap| server named that uses
         the ``subject`` value of your client certificate as the
         username.

      #. Create an |ldap| group whose name matches the {+mdbagent+}'s
         role.

      #. Create the {+mdbagent+}'s role in your ``admin`` database with
         the appropriate permissions.

         .. note::

            When {+aagent+} is activated, {+aagent+} automatically
            creates a role for for the {+mdbagent+} user for |ldap| authentication.

      #. Assign the |ldap| user to the |ldap| group.

      .. seealso::

         .. list-table::
            :widths: 40 60
            :header-rows: 1

            * - To learn how to:
              - See

            * - Create an |ldap| user
              - Documentation for your |ldap| implementation.

            * - Create an |ldap| group
              - Documentation for your |ldap| implementation.

            * - Assign the appropriate roles for the {+mdbagent+}
              - :doc:`/reference/required-access-mongodb-agent`.

            * - Map an |ldap| group and MongoDB role
              - :ref:`LDAP Roles section
                <security-ldap-external-roles>` of the
                :manual:`LDAP authorization
                </core/security-ldap-external>` page in the MongoDB
                manual.

            * - Configure |ldap| authorization without |mms| automation
              - :manual:`LDAP Authorization
                </core/security-ldap-external>` page in the MongoDB
                manual.

   .. tab:: No LDAP Authorization
      :tabid: no-ldap-auth-kerbersos-principal

      If you are not using |ldap| authorization, you must add the ``subject`` value of your client certificate as the username
      of the {+mdbagent+} in the ``$external`` database of your
      MongoDB deployment. Without |ldap| authorization, MongoDB uses
      the ``$external`` database to authenticate a user against
      X.509.

      .. note::

         To discover the appropriate roles for the {+mdbagent+}, see
         :doc:`/reference/required-access-mongodb-agent`.

      Use the following commands to create the users from {+mongosh+}:

      .. literalinclude:: /includes/code-examples/create-user.js
         :language: javascript
         :lines: 1,3,5,8-17
         :linenos:

      To learn what access is required, see
      :doc:`/reference/required-access-mongodb-agent`.

      Each MongoDB user must have its own X.509 certificate.
