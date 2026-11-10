.. _define-roles-prereq:

Prerequisites
-------------

.. include:: /includes/access-create-role.rst

To add custom user-defined roles with {+mongosh+}, see the 
following examples:

- :ref:`create-role-to-manage-ops`.
- :ref:`create-role-for-mongostat`.
- :ref:`create-role-for-system-views`.

.. _create-role-to-manage-ops:

Create a Role to Manage Current Operations
------------------------------------------

The following example creates a role named ``manageOpRole`` which
provides only the privileges to run both :method:`db.currentOp()` 
and :method:`db.killOp()`. [#built-in-roles1]_

.. note::

   Starting in MongoDB 3.2.9, users do not need any specific 
   privileges to view or kill their own operations on 
   :binary:`~bin.mongod` instances. See :method:`db.currentOp()` 
   and :method:`db.killOp()` for details.

.. include:: /includes/steps/create-role-manage-ops.rst

.. [#built-in-roles1] 
   The built-in role :authrole:`clusterMonitor` also provides the
   privilege to run :method:`db.currentOp()` along with other
   privileges, and the built-in role :authrole:`hostManager` 
   provides the privilege to run :method:`db.killOp()` along with 
   other privileges.

.. _create-role-for-mongostat:

Create a Role to Run ``mongostat``
----------------------------------

The following example creates a role named ``mongostatRole`` that 
provides only the privileges to run :binary:`~bin.mongostat`.
[#built-in-roles2]_

.. include:: /includes/steps/create-role-mongostat.rst

.. [#built-in-roles2] The built-in role
   :authrole:`clusterMonitor` also provides the privilege to run
   :binary:`~bin.mongostat` along with other
   privileges.

.. _create-role-for-system-views:

Create a Role to Drop ``system.views`` Collection across Databases
------------------------------------------------------------------

The following example creates a role named
``dropSystemViewsAnyDatabase`` that provides the privileges to 
drop the ``system.views`` collection in any database.

.. include:: /includes/steps/create-role-dropSystemViews.rst
