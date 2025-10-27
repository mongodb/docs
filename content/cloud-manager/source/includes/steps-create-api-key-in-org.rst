.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-access-manager-apps.rst
      
   .. step:: Click :guilabel:`Add new` :icon:`arrow-right` :guilabel:`Application` :icon:`arrow-right` :guilabel:`API Key`.
      
   .. step:: Complete the :guilabel:`API Key Information` form.
      
      From the :guilabel:`API Key Information` step of the
      :guilabel:`Add API Key` page:
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
         :stub-columns: 1
      
         * - Field
           - Value
      
         * - Description
           - Enter a description for the new |api| Key.
      
         * - Organization Permissions
           - Select the :ref:`new role or roles <organization-roles>` for the |api| Key.
      
   .. step:: Click :guilabel:`Next`.
      
   .. step:: Add Access List Values for this API Key.
      
      From the :guilabel:`Private Key & Access List` step of the
      :guilabel:`Add API Key` page, click :guilabel:`Add Access List Entry`.
      
      For this |api| Key, You can choose to either:
      
      - Enter an |ipv4| address from which |mms| should accept |api|
        requests, or
      
      - Click :guilabel:`Use Current IP Address` if the host you are using
        to access |mms| will make |api| requests.
      
   .. step:: Click :guilabel:`Save`.
      
      .. include:: /includes/api/facts/copy-private-key.rst
      
