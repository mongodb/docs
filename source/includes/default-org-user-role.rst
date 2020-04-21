(Optional) Select a Default User Role for the Organization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :guilabel:`Federation Management Console` to grant users who 
authenticate through |idp-provider| a default 
:ref:`role <organization-roles>` in a mapped organization. 
You can select different roles for different organizations.

.. note::

   The selected role only applies to users who authenticate through 
   |idp-provider| if they do not already have a 
   :ref:`role <organization-roles>` in the organization.

.. include:: /includes/steps/org-mapping-default-role.rst
