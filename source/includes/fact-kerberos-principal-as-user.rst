After creating the Kerberos |upn|, create a user mapped to the agent's
|upn| and grant it privileges on your MongoDB deployment.

Where you create the user depends upon if you are using 
:manual:`LDAP authorization </core/security-ldap-external>`: 

- If you are using |ldap| authorization, you must create a user and
  group for the agent on the |ldap| server and map the |ldap| group to
  a MongoDB role in your deployment's ``admin`` database.
  
- If you are not using |ldap| authorization, you must create the
  agent's user on the ``$external`` database in your MongoDB
  deployment.

Using |ldap| to Authorize the MongoDB Agent User
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are using |ldap| Authorization in your MongoDB deployment, you
must manage the MongoDB users for your agents through your |ldap|
Server.

.. warning::

   When using |ldap| Authorization, do not create any users in the
   ``$external`` database. MongoDB 3.4 does not start if there is a
   user in the ``$external`` database and |ldap| authorization is
   enabled.

For each MongoDB user representing an |mms| agent:

#. Create a new |ldap| user on your |ldap| server named with the
   Agent's |upn|.

#. Create an |ldap| group whose name matched the agent's role exactly.

#. Create the agent's role in your ``admin`` database with the 
   appropriate permissions.

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
        - **LDAP Roles** section of the 
          :manual:`LDAP authorization </core/security-ldap-external>` 
          page in the MongoDB manual.

      * - Configure |ldap| authorization without |mms| automation
        - :manual:`LDAP Authorization </core/security-ldap-external>` 
          page in the MongoDB manual.

Using MongoDB to Authorize the MongoDB Agent User
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are using MongoDB to manage user authorization, you need to add
each Agent's |upn| as a user in ``$external`` database in your MongoDB
deployment. Without |ldap| authorization, MongoDB uses the
``$external`` database to authenticate a user against an external
source such as Kerberos.

.. note::
   To discover the appropriate roles for the agents, see 
   :doc:`/reference/required-access-mongodb-agent`.
