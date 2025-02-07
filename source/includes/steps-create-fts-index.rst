.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst
   
   .. step:: Review the default |fts| index configuration settings in the :guilabel:`Index Configurations` section.

      You can use either the default index definition or specify a custom
      index definition: 
  
      - The default index definition is a :ref:`dynamic mapping
        <static-dynamic-mappings>` of the fields in the documents and will  
        work with any collection. 
      - A custom index definition is a :ref:`static mapping
        <static-dynamic-mappings>`. You specify the fields to index, the
        analyzer, and the data type.   

      .. tabs:: 

         .. tab:: Visual Editor
            :tabid: vib 

            .. include:: /includes/list-table-fts-index-visual-editor.rst  

         .. tab:: JSON Editor
            :tabid: jsonib 

            .. include:: /includes/list-table-fts-index-json-editor.rst

            To learn more about these index definition settings, see
            :ref:`ref-index-definitions`. 

      If you are satisfied with the default configuration, skip ahead.
      If you wish to refine your |fts| index, proceed to the next step.

   .. step:: Refine your |fts| index to configure additional settings.

      .. tabs:: 

         .. tab:: Visual Editor
            :tabid: vib 
        
            a. Click :guilabel:`Refine Your Index` to make changes to any of
               the following settings. 

               .. include:: /includes/list-table-fts-vib-advanced-config.rst

            #. Click :guilabel:`Save Changes`.

         .. tab:: JSON Editor
            :tabid: jsonib 
      
            a. Add any of the following settings to your index:

               .. include:: /includes/list-table-fts-jib-advanced-config.rst

               To learn more about these index definition settings, see
               :ref:`ref-index-definitions`. 

            #. Click :guilabel:`Next`.    

   .. step:: *Optional.* If you use the :guilabel:`Visual Editor`, you can save or delete your index definition draft.

      .. note::

         If you use the :guilabel:`Visual Editor` and your index definition 
         contains :ref:`static mappings <static-dynamic-mappings>`, you can 
         save an index definition as a draft. You can't save the 
         :ref:`default index definition <default-index-definition>` as a 
         draft. You can save only a :ref:`custom index definition 
         <default-index-definition>` as a draft.
      
      a. Click :guilabel:`Cancel`.
      
      #. Click :guilabel:`Save Draft` or :guilabel:`Delete Draft`.
      
         .. include:: /includes/fact-index-draft-pending.rst
      
         To learn more about creating an index using an index draft, see 
         :ref:`ref-resume-index`.
       
   .. include:: /includes/steps-fts-finish-index-creation.rst
