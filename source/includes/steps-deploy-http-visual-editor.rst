a. Select the dataset for your {+fdi+} from the :guilabel:`Data Sources`
   section.

   Click :guilabel:`Add Data Sources` to select your data store.

#. Specify your data store.

   Choose :guilabel:`HTTP(S)` to configure a {+fdi+} for data in publicly
   accessible |http| and |https| |url|\s.

   Corresponds to :datalakeconf-http:`stores.[n].provider` |json| 
   configuration setting.

#. Enter a name for your |http| data store into the :guilabel:`HTTP(S)
   Store Name` field.

   .. note::

      The data store's name must be unique within your {+fdi+}.

   Corresponds to :datalakeconf-http:`stores.[n].name` |json| 
   configuration setting.

#. Enter the publicly accessible |url| of the file where data is stored.

   {+adf+} supports |json|, |bson|, |csv|, TSV, Avro (gzipped or
   uncompressed), Parquet, and ORC file types.

   .. tip::

      Click :guilabel:`Use Sample URL` to add a sample |http|
      data store.

   For each additional |http| data store that you want to add, 
   click :guilabel:`Add Another URL`, then enter the |http| data
   store URLs.

   Corresponds to :datalakeconf-http:`stores.[n].urls` |json| 
   configuration setting.

#. Click :guilabel:`Next` to configure virtual databases and collections.

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

   #. Select :guilabel:`HTTP` from the dropdown in the 
      :guilabel:`Data Sources` section.
   #. Drag and drop the data store to map with the collection.

      Corresponds to ``databases.[n].collections.[n].dataSources`` 
      |json| configuration setting.
