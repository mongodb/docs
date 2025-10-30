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

You can create a database user that uses :ref:`OIDC <oidc-authentication-authorization>`
for authentication.

The :ref:`authentication database <user-authentication-database>` for
|oidc|-authenticated users is the ``$external`` database.

|oidc| authentication is available only on {+database-deployments+} that use MongoDB
version 7.0 and higher.

Required Access
---------------

To add database users, you must have
:authrole:`Organization Owner`, :authrole:`Project Owner`, or 
:authrole:`Project Database Access Admin` access to |service|.

Add Database Users
------------------

The {+atlas-cli+} uses the following commands to create new database users and X.509 certificates. The options you specify determine the authentication method.

.. include:: /includes/extracts/atlas-dbusers-create-and-certs-create.rst

View Database Users and Certificates
------------------------------------

View Database Users
~~~~~~~~~~~~~~~~~~~

.. include:: /includes/extracts/atlas-dbusers-describe-and-list.rst

View X.509 Certificates for a Database User
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/extracts/atlas-dbusers-certs-list.rst

Modify Database Users
---------------------

.. include:: /includes/extracts/atlas-dbusers-update.rst

Delete Database Users
---------------------

.. include:: /includes/extracts/atlas-dbusers-delete.rst
