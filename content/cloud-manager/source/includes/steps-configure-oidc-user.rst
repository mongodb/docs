.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-deployment.rst
      
   .. include:: /includes/nav/steps-security.rst

   .. step:: Navigate to the :guilabel:`MongoDB Roles` tab for your deployment.
      
      Click the :guilabel:`MongoDB Roles` tab.
      
   .. step:: Click :guilabel:`Add New Role`.
      
   .. step:: Create the OIDC role.
      
      a. Enter the following fields:
      
         .. list-table::
            :header-rows: 1
            :widths: 20 20 60
      
            * - Field
              - Necessity
              - Description
      
            * - :guilabel:`Identifier`
              - Required
              - In the :guilabel:`database` box, enter ``admin``.
                
                In the :guilabel:`name` box, enter your ``projectId`` and
                group name from your |idp| separated by a slash ``/``:
      
                .. code-block:: none
      
                   {projectId}/{group_name}
      
            * - :guilabel:`Inherits From`
              - Optional
              - A list of role name and database pairs. The format for these
                pairs are ``roleName@dbName``.
      
            * - :guilabel:`Authentication Restrictions`
              - Optional
              - A list of IP addresses or CIDR notations that you want to
                restrict from your |idp|.
      
      #. Click :guilabel:`Add Role`.   
