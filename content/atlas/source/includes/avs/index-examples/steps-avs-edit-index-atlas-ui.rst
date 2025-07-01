.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. step:: Edit the index.

      a. Locate the ``vectorSearch`` type index to edit.
      #. Click :icon-mms:`ellipsis` from the :guilabel:`Actions`
         column for that index.
      #. Select either :guilabel:`Edit With Visual Editor` for a guided experience
         or :guilabel:`Edit With JSON Editor` to edit the raw index definition.
      #. Review the current configuration settings and edit them as needed. 
         
         To learn more about the fields in an {+avs+} index, see
         :ref:`avs-types-vector-search`. 
      
      #. Click :guilabel:`Save` to apply the changes. 

      The index's status changes from :guilabel:`Active` to
      :guilabel:`Building`. In this state, you can continue to use the
      old index because {+avs+} does not delete the old index until the
      updated index is ready for use. Once the status returns to
      :guilabel:`Active`, the modified index is ready to use. 
       