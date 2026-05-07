.. procedure:: 
   :style: normal 

   .. include:: /includes/shared/procedures/steps-atlas-search.rst

   .. include:: /includes/shared/procedures/steps-configure-index.rst

   .. step:: Modify the index definition.

      .. collapsible:: 
         :heading: Visual Editor 
         :sub_heading: Use the Visual Editor for a guided experience.
         :expanded: false

         To modify the index, do the following:

         .. include:: /includes/index/autoembed-type/procedures/edit-auto-embed-ui.rst

         To learn more about the {+avs+} index settings, see
         :ref:`avs-types-vector-search`. 

      .. collapsible:: 
         :heading: JSON Editor 
         :sub_heading: Use the JSON Editor to edit the raw JSON.
         :expanded: false 

         Modify the settings in the index definition as 
         needed. To learn more about the {+avs+} index settings, see 
         :ref:`avs-index-definition` and :ref:`avs-types-vector-search-options`.

         You can add multiple fields to your index. However: 
   
         - You can't edit an existing ``autoEmbed`` type field.
         - You can't add a field of type ``vector`` and ``autoEmbed`` in the same index.

   .. include:: /includes/shared/procedures/steps-avs-finish-index-creation.rst