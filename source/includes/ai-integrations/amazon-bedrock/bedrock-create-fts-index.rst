a. Go to the |fts| page for your {+cluster+}.

   In the sidebar, click :guilabel:`Atlas Search` under
   the :guilabel:`Services` heading.
   
#. Click :guilabel:`Create Search Index`.

#. Start your index configuration.

   Make the following selections on the page and then click
   :guilabel:`Next`.

   .. include:: /includes/search-shared/list-table-configure-index.rst

#. Define the index.

   The following index definition dynamically indexes the fields of 
   :ref:`supported types <bson-data-chart>` in the collection. You 
   can use the |fts| :guilabel:`Visual Editor` or the |fts| :guilabel:`JSON 
   Editor` in the |service| user interface to create the index.

   .. tabs:: 

      .. tab:: Visual Editor 
         :tabid: vib 

         Review the default index definition for the 
         collection.

      .. tab:: JSON Editor
         :tabid: json-editor

         a. Review the index definition.
  
            Your index definition should look similar to the 
            following: 

            .. code-block:: json 
                 
               {
                 "mappings": {
                   "dynamic": true
                 }
               }

         #. Click :guilabel:`Next`.

#. Click :guilabel:`Create Search Index`.

#. Close the :guilabel:`You're All Set!` modal window.

   A modal window displays to let you know your index is building. 
   Click the :guilabel:`Close` button.

#. Wait for the index to finish building.

   The index should take about one minute to build. While it is
   building, the :guilabel:`Status` column reads ``Build in
   Progress``. When it is finished building, the
   :guilabel:`Status` column reads ``Active``.
