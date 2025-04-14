.. renamed as an rst file to prevent this from being published in case
   this is a stub. If its not we should remove this as it seems
   redundant.

==================
Define a Privilege
==================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

MongoDB privileges exist within roles. Defining a privilege as part of
role creation.

When creating a role, specify each privilege in its own :ref:`resource
document <resource-document>` in :data:`~admin.system.roles.privileges`
array.

For more information, see :doc:`/tutorial/define-roles`.
