.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Select an |fts| :guilabel:`Configuration Method` and click :guilabel:`Next`.

      .. figure:: /images/fts-create-index.png
         :alt: Screenshot of Create an Atlas Search Index modal window
         :figwidth: 650px
         :border:

      - For a guided experience, select the |fts| :guilabel:`Visual Editor`.
      - To edit the raw index definition, select the |fts| :guilabel:`JSON Editor`.

   .. step:: Enter the :guilabel:`Index Name`, and set the :guilabel:`Database and Collection`.

      a. In the :guilabel:`Index Name` field, specify a name for the index.

         Index names must be unique within their namespace. The index name
         defaults to :guilabel:`default`. You can accept the default name
         or specify a different name. 
     
         .. include:: /includes/default-fts-index-name.rst 

      #. In the :guilabel:`Database and Collection` section, expand the
         database, and select the collection name. 

         .. tip:: 

            If you navigated to this page from the :guilabel:`Data
            Explorer`, you can skip this step because |service|
            preselects the database and collection that you selected in
            the :guilabel:`Data Explorer`.

      #. If you use the :guilabel:`Visual Editor`, click
         :guilabel:`Next`. 

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
       
   .. include:: //includes/steps-fts-finish-index-creation.rst
