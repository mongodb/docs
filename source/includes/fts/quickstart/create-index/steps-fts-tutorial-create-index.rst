a. When the sample data finishes loading, click :guilabel:`Create Search Index`.

#. Make the following selections on the page and then click :guilabel:`Next`.

   .. |database-name| replace:: ``sample_mflix``
   .. |collection-name| replace:: ``movies``

   .. include:: /includes/search-shared/list-table-configure-index.rst

#. Define the index.
   
   The following index definition dynamically indexes the fields 
   in the ``movies`` collection. 

   .. tabs:: 
   
      .. tab:: Visual Editor 
         :tabid: vib
               
         Review the ``"default"`` index definition for the ``movies`` 
         collection.

      .. tab:: JSON Editor
         :tabid: json-editor
         
         a. Review the index definition.
            
            Your index definition should look similar to the following: 
         
            .. code-block:: json 
                           
               {
                  "mappings": {
                     "dynamic": true
                  }
               }
         
            The above index definition dynamically indexes the fields of 
            :ref:`supported types <bson-data-chart>` in each document in 
            the ``movies`` collection. 
         
         #. Click :guilabel:`Next`.
         
#. Click :guilabel:`Create Search Index`.
      
#. Wait for the index to finish building.
      
   The index should take about one minute to build. While it is
   building, the :guilabel:`Status` column reads ``Build in
   Progress``. When it is finished building, the
   :guilabel:`Status` column reads ``Active``.
