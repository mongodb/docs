.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click the cluster name to view cluster details.

   .. step:: Click the :guilabel:`Atlas Search` tab.
      
   .. step:: Click :icon-mms:`ellipsis` and choose one of the following from the dropdown.
      
      - :guilabel:`Edit with Visual Editor` for a guided experience.
      - :guilabel:`Edit with JSON Editor` to edit the raw index definition.
      
   .. step:: Review current configuration settings and edit them as needed.
      
      .. tabs:: 
      
         .. tab:: Visual Editor
            :tabid: vib 
      
            Review the following index configuration settings:
      
            .. include:: /includes/list-table-fts-index-visual-editor.rst  
      
            Review the following advanced configuration settings:
      
            .. include:: /includes/list-table-fts-vib-advanced-config.rst
      
         .. tab:: JSON Editor
            :tabid: jsonib 
      
            Review the following index configuration settings:
      
            .. include:: /includes/list-table-fts-index-json-editor.rst
      
            Review the following advanced configuration settings:
      
            .. include:: /includes/list-table-fts-jib-advanced-config.rst
      
            To learn more about these index definition settings, see
            :ref:`ref-index-definitions`.
      
   .. step:: Click :guilabel:`Save` to apply the changes.

      The index's status changes from :guilabel:`Active` to 
      :guilabel:`Building`. In this state, you can continue to use the old 
      index because |fts| does not delete the old index until the updated 
      index is ready for use. Once the status returns to 
      :guilabel:`Active`, the modified index is ready to use.
      