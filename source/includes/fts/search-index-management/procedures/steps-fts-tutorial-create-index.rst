.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
   
   .. include:: /includes/nav/steps-configure-index.rst
      
   .. step:: Specify an index definition.
      
      You can create an |fts| index that uses :ref:`dynamic mappings 
      <static-dynamic-mappings>` or :ref:`static mappings 
      <static-dynamic-mappings>`. To learn more about dynamic and static 
      mappings, see :ref:`static-dynamic-mappings`.
      
      The following index definition dynamically indexes the fields of 
      :ref:`supported types <bson-data-chart>` in the ``movies`` 
      collection. 

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
            
   .. step:: Click :guilabel:`Create Search Index`.
      
   .. step:: Close the :guilabel:`You're All Set!` Modal Window.
      
      A modal window appears to let you know your index is building. Click 
      the :guilabel:`Close` button.
      
   .. step:: Wait for the index to finish building.
      
      The index should take about one minute to build. While it is
      building, the :guilabel:`Status` column reads ``Build in
      Progress``. When it is finished building, the
      :guilabel:`Status` column reads ``Active``.
