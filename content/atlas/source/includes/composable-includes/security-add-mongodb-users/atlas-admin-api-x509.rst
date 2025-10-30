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

:manual:`X.509 Certificates </core/security-x.509/>`, also known 
as mutual TLS or mTLS, allow passwordless authentication by using 
a trusted certificate.

The :ref:`authentication database <user-authentication-database>` for
X.509-authenticated users is the ``$external`` database.

If you :ref:`enable LDAP authorization 
<ldaps-authentication-authorization>`, you can't connect to your
{+database-deployments+} with users that authenticate with an
|service|-managed X.509 certificate. To enable |ldap| and
connecting to your {+database-deployments+} with X.509 users, see
:ref:`self-managed-x509`.

Required Access
---------------

To add database users, you must have
:authrole:`Organization Owner`, :authrole:`Project Owner`, or 
:authrole:`Project Database Access Admin` access to |service|.


Add Database Users
------------------

You can add database users through the {+atlas-admin-api+}. The 
options you specify determine the authentication method. To learn 
more, see :oas-bump-atlas-op:`Create One Database User 
<creategroupdatabaseuser>`.


View Database Users and Certificates
------------------------------------

To view |service| database users using the 
{+atlas-admin-api+}, see :oas-bump-atlas-op:`Get All
<listgroupdatabaseusers>`.


Modify Database Users
---------------------

You can update database users through the {+atlas-admin-api+}. To 
learn more, see :oas-bump-atlas-op:`Update One 
<updategroupdatabaseuser>`.


Delete Database Users
---------------------

You can delete database users through the {+atlas-admin-api+}. To 
learn more, see :oas-bump-atlas-op:`Delete One 
<deletegroupdatabaseuser>`.
