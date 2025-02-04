.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
      
   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Select an |fts| :guilabel:`Configuration Method` and click :guilabel:`Next`.
      
      - For a guided experience, select the |fts| :guilabel:`Visual Editor`.
      - To edit the raw index definition, select the |fts|
        :guilabel:`JSON Editor`.
      
   .. step:: Enter the :guilabel:`Index Name`, and set the :guilabel:`Database and Collection`.
      
      a. In the :guilabel:`Index Name` field, enter ``facet-tutorial``.
      
         .. include:: /includes/default-fts-index-name.rst 
      
      #. In the :guilabel:`Database and Collection` section, find the 
         ``sample_mflix`` database, and select the ``movies`` collection.
      
   .. step:: Specify an index definition.
      
      You can create an |fts| index that uses :ref:`dynamic mappings 
      <static-dynamic-mappings>` or :ref:`static mappings 
      <static-dynamic-mappings>`. To learn more about dynamic and static 
      mappings, see :ref:`static-dynamic-mappings`.
      
      The following index definition dynamically indexes the fields of 
      :ref:`supported types <bson-data-chart>` in the ``movies`` 
      collection. You can use the |fts| :guilabel:`Visual Editor` or the 
      |fts| :guilabel:`JSON Editor` in the |service| user interface to create the 
      index.
      
      Visual Editor
      +++++++++++++
                  
      a. Click :guilabel:`Next`.
      #. Click :guilabel:`Refine Your Index`.
      #. In the :guilabel:`Field Mappings` section, click :guilabel:`Add Field Mapping`. 
      #. Select :guilabel:`Customized Configuration` and then the following:

         .. list-table:: 

            * - :guilabel:`Field Name`
              - ``genres`` 

            * - :guilabel:`Data Type`
              - ``StringFacet`` 

      #. Click :guilabel:`Add` and repeat steps c and d to configure the
         following:

         .. list-table:: 

            * - :guilabel:`Field Name`
              - ``year`` 

            * - :guilabel:`Data Type`
              - ``NumberFacet`` 

      #. Click :guilabel:`Add` and then :guilabel:`Save Changes`.

      JSON Editor
      +++++++++++
      
      a. Click :guilabel:`Next`.
      #. Review the index definition.
         
         Your index definition should look similar to the following: 
      
         .. code-block:: json 
                        
            {
              "mappings": {
                "dynamic": true,
                "fields": {
                  "genres": {
                    "type": "stringFacet"
                  },
                  "year": {
                    "type": "numberFacet"
                  }
                }
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
      
