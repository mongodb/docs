After creating the Kerberos SPN, create a user mapped to the agent's SPN and
grant it privileges on your MongoDB deployment.

Where you create the user depends upon if you are using 
:manual:`LDAP authorization </core/security-ldap-external>`: 

- If you are using LDAP authorization, you must create a user and group for
  the agent on the LDAP server and map the LDAP group to a MongoDB role in
  your deployment's ``admin`` database.
  
- If you are not using LDAP authorization, you must create the agent's
  user on the ``$external`` database in your MongoDB deployment.

Using LDAP to Authorize the MongoDB Agent User
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are using LDAP Authorization in your MongoDB deployment, you
must manage the MongoDB users for your agents through your LDAP Server.

.. warning::
   When using LDAP Authorization, do not create any users in the ``$external``
   database. MongoDB 3.4 does not start if there is a user in the
   ``$external`` database and LDAP authorization is enabled.

For each MongoDB user representing an |mms| agent:

#. Create a new LDAP user on your LDAP server named with the SPN.

   See the documentation for your LDAP implementation for how
   you create an LDAP user.

#. Create an LDAP group whose name matched the agent's role exactly.

   See the documentation for your LDAP implementation for how
   you create an LDAP group.
   
#. Create the agent's role in your ``admin`` database with the appropriate permissions.

   See :doc:`/reference/required-access-backup-agent` and 
   :doc:`/reference/required-access-monitoring-agent` for
   appropriate roles for the agents.

#. Assign the LDAP user to the LDAP group.

   See the **LDAP Roles** section of the 
   :manual:`LDAP authorization </core/security-ldap-external>` page of
   the MongoDB manual for how to map an LDAP group and MongoDB role.

.. seealso::

   See the :manual:`/core/security-ldap-external` page for how to enable
   LDAP authorization without |mms| automation.

Using MongoDB to Authorize the MongoDB Agent User
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are using MongoDB to manage user authorization, you need to add each
agent's SPN as a user in ``$external`` database in your MongoDB deployment.
Without LDAP authorization, MongoDB uses the ``$external`` database to
authenticate a user against an external source such as Kerberos.

.. note::
   See :doc:`/reference/required-access-backup-agent` and 
   :doc:`/reference/required-access-monitoring-agent` for
   appropriate roles for the agents.