You need the following public API key, private API key, and the 
organization ID information to configure |ak8so| access to |service|.

- If you want |ak8so| to create a new |service| project,  
  :ref:`create-org-api-key`. If your organization requires an IP
  access list for the {+atlas-admin-api+}, you must also
  :ref:`configure the API access list <edit-project-api-key-access-list>`.

  .. important::

     You must assign the API key the
     :guilabel:`Organization Project Creator` organization role or 
     higher.

- If you want to work with an existing |service| project, 
  :ref:`create-project-api-key`. If your organization requires an IP
  access list for the {+atlas-admin-api+}, you must also
  :ref:`configure the API access list <edit-project-api-key-access-list>`.

  .. important::

     You must assign the API key the :guilabel:`Project Owner` 
     project role.
     