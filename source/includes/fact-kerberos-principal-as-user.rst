After creating the Kerberos :abbr:`SPN (Service Principal Name)`, 
create a user mapped to the agent's
:abbr:`SPN (Service Principal Name)` and grant it privileges on your 
MongoDB deployment.

Where you create the user depends upon if you are using 
:manual:`LDAP authorization </core/security-ldap-external>`: 

- If you are using :abbr:`LDAP (Lightweight Directory Access Protocol)`
  authorization, you must create a user and group
  for the agent on the 
  :abbr:`LDAP (Lightweight Directory Access Protocol)` server and map 
  the :abbr:`LDAP (Lightweight Directory Access Protocol)` group to a 
  MongoDB role in your deployment's ``admin`` database.
  
- If you are not using 
  :abbr:`LDAP (Lightweight Directory Access Protocol)` authorization, 
  you must create the agent's user on the ``$external`` database in 
  your MongoDB deployment.

Using :abbr:`LDAP (Lightweight Directory Access Protocol)` to Authorize the MongoDB Agent User
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are using :abbr:`LDAP (Lightweight Directory Access Protocol)` 
Authorization in your MongoDB deployment, you
must manage the MongoDB users for your agents through your 
:abbr:`LDAP (Lightweight Directory Access Protocol)` Server.

.. warning::

   When using :abbr:`LDAP (Lightweight Directory Access Protocol)` 
   Authorization, do not create any users in the ``$external`` database.
   MongoDB 3.4 does not start if there is a user in the ``$external`` 
   database and :abbr:`LDAP (Lightweight Directory Access Protocol)` 
   authorization is enabled.

For each MongoDB user representing an |mms| agent:

#. Create a new :abbr:`LDAP (Lightweight Directory Access Protocol)` 
   user on your :abbr:`LDAP (Lightweight Directory Access Protocol)` 
   server named with the :abbr:`SPN (Service Principal Name)`.

#. Create an :abbr:`LDAP (Lightweight Directory Access Protocol)` group 
   whose name matched the agent's role exactly.

#. Create the agent's role in your ``admin`` database with the 
   appropriate permissions.

#. Assign the :abbr:`LDAP (Lightweight Directory Access Protocol)` user 
   to the :abbr:`LDAP (Lightweight Directory Access Protocol)` group.

.. seealso::

   .. list-table::
      :widths: 40 60
      :header-rows: 1

      * - To learn how to:
        - See 

      * - Create an :abbr:`LDAP (Lightweight Directory Access Protocol)` 
          user 
        - Documentation for your 
          :abbr:`LDAP (Lightweight Directory Access Protocol)` 
          implementation.

      * - Create an :abbr:`LDAP (Lightweight Directory Access Protocol)` 
          group
        - Documentation for your 
          :abbr:`LDAP (Lightweight Directory Access Protocol)` 
          implementation.
      
      * - Assign the appropriate roles for the agents
        - :doc:`/reference/required-access-backup-agent` and 
          :doc:`/reference/required-access-monitoring-agent`.

      * - Map an LDAP group and MongoDB role
        - **LDAP Roles** section of the 
          :manual:`LDAP authorization </core/security-ldap-external>` 
          page in the MongoDB manual.

      * - Configure LDAP authorization without |mms| automation
        - :manual:`LDAP Authorization </core/security-ldap-external>` 
          page in the MongoDB manual.

Using MongoDB to Authorize the MongoDB Agent User
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are using MongoDB to manage user authorization, you need to add
each agent's :abbr:`SPN (Service Principal Name)` as a user in
``$external`` database in your MongoDB deployment. Without 
:abbr:`LDAP (Lightweight Directory Access Protocol)`
authorization, MongoDB uses the ``$external`` database to authenticate 
a user against an external source such as Kerberos.

.. note::
   To discover the appropriate roles for the agents, see 
   :doc:`/reference/required-access-backup-agent` and 
   :doc:`/reference/required-access-monitoring-agent`.
