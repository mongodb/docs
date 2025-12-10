a. Select the dataset for your {+fdi+} from the  :guilabel:`Data Sources` section.

   Click :guilabel:`Add Data Sources` to select your data store.

#. Specify your data source.

   i. Choose :guilabel:`Atlas Cluster` to configure a {+fdi+} for data on
      your |service| cluster. 

      Corresponds to :datalakeconf-atlas:`stores.[n].provider` |json| 
      configuration setting.
 
   #. Select the |service| cluster that you want to use as a data
      store in the :guilabel:`Provide Namespaces in this  
      project` section.

      Corresponds to :datalakeconf-atlas:`stores.[n].clusterName` |json|
      configuration setting. 

   #. Expand the databases and select the collections that you 
      want to add to your {+fdi+}.

      To filter the databases and collections, enter text into 
      the :guilabel:`Search database or collection` field. The 
      dialog box displays only databases and collections with names
      that match your search criteria.

      Corresponds to the
      :datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].database`
      and :datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].collection`
      |json| configuration settings.

   #. *Optional*. Specify the :guilabel:`Cluster Read Preference` 
      settings by expanding the section. 

      Corresponds to :datalakeconf-atlas:`stores.[n].readPreference`.
            
      .. list-table:: 
         :header-rows: 1
         :widths: 25 75 

         * - Field Name 
           - Description

         * - :guilabel:`Read Preference Mode`
           - Specifies the replica set member to which you want to 
             route the read requests. You can choose one of the 
             following from the dropdown: 

             .. include:: /includes/data-federation/fact-read-preference-modes.rst

             :gold:`IMPORTANT` If you add an |service| cluster as a store, the
             default value is ``secondary``.
             
             If you don't set anything in your {+fdi+} storage
             configuration, the default value is ``nearest``. To
             learn more, see :manual:`Read preference mode </core/read-preference/#read-preference-modes>`.


             Corresponds to :datalakeconf-atlas:`stores.[n].readPreference.mode`.

         * - :guilabel:`TagSets`
           - Specifies the list of tags or tag 
             specification documents that contain name and value 
             pairs for the replica set member to which you want to 
             route read requests. To learn more, see :manual:`Read 
             Preference Tag Sets </core/read-preference-tags/>`.

             Corresponds to :datalakeconf-atlas:`stores.[n].readPreference.tagSets`.

         * - :guilabel:`Maxstaleness Seconds`
           - Specifies the maximum replication lag, or 
             "staleness", for reads from secondaries. To learn 
             more, see :manual:`Read Preference 
             maxStalenessSeconds </core/read-preference-staleness/>`.

             Corresponds to :datalakeconf-atlas:`stores.[n].readPreference.maxStalenessSeconds`.

   #. Click :guilabel:`Next`.

#. Create the virtual databases, collections, and views and map the
   databases, collections, and views to your data store.

   i. (Optional) Click the :icon-fa4:`pencil` for the:

      - Database to edit the database name. Defaults to ``VirtualDatabase[n]``. 

        Corresponds to ``databases.[n].name`` |json| configuration 
        setting.

      - Collection to edit the collection name. Defaults to 
        ``VirtualCollection[n]``. 
       
        Corresponds to ``databases.[n].collections.[n].name`` |json| 
        configuration setting.

      - View to edit the view name. 

      You can click: 
     
      - :guilabel:`Add Database` to add databases and collections. 
      - :icon-fa4:`plus` associated with the database to add collections 
        to the database. 
      - :icon-fa4:`plus` associated with the collection to add 
        :manual:`views </core/views/>` on the collection. To create a 
        view, you must specify: 
       
        - The name of the view.
        - The :manual:`pipeline 
          </core/aggregation-pipeline/#std-label-aggregation-pipeline>` 
          to apply to the view.

          The view definition pipeline cannot include the ``$out`` or 
          the ``$merge`` stage. If the view definition includes 
          nested pipeline stages such as ``$lookup`` or ``$facet``, 
          this restriction applies to those nested pipelines as well.

        To learn more about views, see: 

        - :manual:`Views </core/views/>`
        - :manual:`db.createView </reference/method/db.createView/>`

      - :icon-fa4:`trash-o` associated with the database, collection, or 
        view to remove it.

   #. Select :guilabel:`Atlas Cluster` from the dropdown in the 
      :guilabel:`Data Sources` section.
   #. Drag and drop the data store to map with the collection.

      Corresponds to ``databases.[n].collections.[n].dataSources`` 
      |json| configuration setting.
