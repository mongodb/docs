Create database users to provide clients access to the {+database-deployments+} in your
project. 

A database user's access is determined by the roles assigned
to the user. When you create a database user, any of the :ref:`built-in roles <atlas-user-privileges>` 
add the user to all {+database-deployments+} in your |service| project. 
To specify which resources a database user can access in your project, you 
can select the option :guilabel:`Restrict Access to Specific Clusters` in the {+atlas-ui+}
or set :ref:`specific privileges <atlas-specific-privileges>`
and :ref:`custom roles <mongodb-roles>`.

Database users are separate from |service| users. Database users have
access to MongoDB databases, while |service| users have access to the
|service| application itself. |service| supports creating temporary
database users that automatically expire within a user-configurable
7-day period.

.. include:: /includes/fact-user-auditing.rst

.. include:: /includes/fact-database-user-limits.rst

.. important::

   You must use the :atlascli:`{+atlas-cli+} 
   </command/atlas-dbusers-create/>`, 
   :oas-bump-atlas-tag:`{+atlas-admin-api+} <database-users>`, 
   {+atlas-ui+}, or a supported :ref:`integration 
   <partner-integrations>` to add, modify, or delete database users on 
   |service| {+database-deployments+}. Otherwise, |service| rolls back 
   any user modifications.

Database User Authentication
----------------------------

:ref:`SCRAM <authentication-scram>` is MongoDB's
default authentication method. SCRAM requires a password for
each user.

The :ref:`authentication database <user-authentication-database>` for
SCRAM-authenticated users is the ``admin`` database.

.. note::

    By default, Atlas supports SCRAM-SHA-256 authentication. 
    If you have any database users created before the release of 
    MongoDB 4.0, update their passwords to generate SCRAM-SHA-256
    credentials. You may reuse existing passwords.

Required Access
---------------

To add database users, you must have
:authrole:`Organization Owner`, :authrole:`Project Owner`, or 
:authrole:`Project Database Access Admin` access to |service|.

Add Database Users
------------------

Select an authentication mechanism and follow the steps to create
a new database user using the {+atlas-ui+}.

.. include:: /includes/steps-add-scram-user.rst

View Database Users and Certificates
-------------------------------------

To view |service| database users and X.509 certificates in the 
      {+atlas-ui+}:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-access.rst

   .. step:: View |service| database users.
      
      a. If it's not already displayed, click the 
         :guilabel:`Database Users` tab.

      b. Click :icon-fa4:`pencil` :guilabel:`Edit` for the user 
         to view their privileges, authentication details, and 
         X.509 certificates.

Modify Database Users
---------------------

.. include:: /includes/modify-db-user-ui.rst

Delete Database Users
---------------------

To delete existing users for an |service| project using the {+atlas-ui+}:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-access.rst

      .. step:: Delete an existing user.

         a. If it's not already displayed, click the    
            :guilabel:`Database Users` tab.

         #. Click :icon-fa4:`trash-o` :guilabel:`Delete` next to 
            the user you want to delete.

         #. Click :guilabel:`Delete` again to confirm.
