.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click the cluster name to view cluster details.

   .. step:: Click the :guilabel:`Atlas Search` tab.
      
   .. step:: Create an index.
      
      Click :guilabel:`Create Search Index`.
      
   .. step:: Select an |fts| :guilabel:`Configuration Method` and click :guilabel:`Next`.
      
      - For a guided experience, select the |fts| :guilabel:`Visual Editor`.
      
      - To edit the raw index definition, select the |fts|
        :guilabel:`JSON Editor`.
      
   .. step:: Enter the :guilabel:`Index Name`, and set the :guilabel:`Database and Collection`.
      
      a. In the :guilabel:`Index Name` field, enter a name for the index.
         
         .. include:: /includes/default-fts-index-name.rst 
      
      #. In the :guilabel:`Database and Collection` section, find the 
         database or collection, and select the collection name.
      
      #. If you use the :guilabel:`Visual Editor`, click :guilabel:`Next`.
      
   .. step:: Review the default |fts| index configuration settings in the :guilabel:`Index Configurations` section.
      
      .. tabs:: 
      
         .. tab:: Visual Editor
            :tabid: vib 
      
            .. include:: /includes/list-table-fts-index-visual-editor.rst  
      
         .. tab:: JSON Editor
            :tabid: jsonib 
      
            .. include:: /includes/list-table-fts-index-json-editor.rst
      
            To learn more about these index definition settings, see
            :ref:`ref-index-definitions`. 
      
      If you are satisfied with the default configuration, skip to step 10.
      If you wish to refine your |fts| index, proceed to the next step.
      
   .. step:: Refine your |fts| index to configure additional settings.
      
      .. tabs:: 
      
         .. tab:: Visual Editor
            :tabid: vib 
      
            If you are using the :guilabel:`Visual Editor`: 
            
            a. Click :guilabel:`Refine Your Index` to make changes to any of
               the following settings. 
      
               .. include:: /includes/list-table-fts-vib-advanced-config.rst
      
            #. Click :guilabel:`Save Changes`.
      
         .. tab:: JSON Editor
            :tabid: jsonib 
      
            If you are using the |fts| :guilabel:`JSON Editor`, do the following: 
          
            a. Add any of the following settings to your index:
      
               .. include:: /includes/list-table-fts-jib-advanced-config.rst
      
               To learn more about these index definition settings, see
               :ref:`ref-index-definitions`. 
      
            #. Click :guilabel:`Next`.    
      
   .. step:: If you use the :guilabel:`Visual Editor`, you can save or delete your index definition draft.
      
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
      
   .. step:: Click :guilabel:`Create Search Index`.
      
   .. step:: Close the :guilabel:`You're All Set!` Modal Window.
      
      A modal window appears to let you know your index is building. Click 
      the :guilabel:`Close` button.
      
   .. step:: Check the status.
      
      The newly created index appears on the :guilabel:`Atlas Search` tab. While 
      the index is building, the :guilabel:`Status` field reads 
      :guilabel:`Build in Progress`. When the index is finished building,
      the :guilabel:`Status` field reads :guilabel:`Active`.
      
      .. note::
      
         Larger collections take longer to index. You will receive an email
         notification when your index is finished building.  
