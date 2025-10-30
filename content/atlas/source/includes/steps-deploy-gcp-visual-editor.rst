a. Select the dataset for your {+fdi+} from the :guilabel:`Data Sources`
   section.

   Click :guilabel:`Add Data Sources` to select your data store.

#. Specify your data store.

   Choose :guilabel:`Google Cloud Storage` to configure a {+fdi+} for
   data in {+gcs+} buckets.

   Corresponds to ``stores.[n].provider`` |json| configuration
   setting.

#. Select a {+gcp+} Service Account for |service|.

   You can select an existing {+gcp+} Service Account that |service|
   is authorized for from the role selection dropdown list or choose
   :guilabel:`Create a Google Service Account`.
  
   If you selected an existing account that |service| is authorized
   for, click :guilabel:`Next` and proceed to the next step to list
   your {+gcs+} buckets.
  
   If you are creating a new service account, select :guilabel:`Create
   a Google Service Account` and click :guilabel:`Next`.

   .. seealso:: 

      - :atlas:`Set Up GCP Service Account Access </security/set-up-gcp-access>`.
      - :oas-bump-atlas-op:`Create a Cloud Provider Access Role <creategroupcloudprovideraccess>`

#. In the :guilabel:`Configure Google Cloud Storage` modal, follow the
   provided instructions to configure the {+gcp+} CLI, then click
   :guilabel:`Next`.

#. Configure {+gcs+}.

   i. Enter the name of your {+gcs+} bucket.

      Corresponds to the ``stores.[n].bucket`` |json| 
      configuration setting.

   #. Specify whether the bucket is :guilabel:`Read-only` or both 
      :guilabel:`Read and write`. 

      |service| can only query :guilabel:`Read-only` buckets; if you
      wish to query and save query results to your {+gcs+} bucket,
      choose :guilabel:`Read and write`.
  
   #. Select the region of the {+gcs+} bucket. 

      Corresponds to the ``stores.[n].region`` |json| configuration
      setting.

      .. note::

         You can't create a {+fdi+} if {+adf+} is unable to retrieve the  
         region of the specified {+gcs+} bucket.

   #. Grant access to your {+gcp+} project.

      a. In the {+gcp+} console for the project that hosts your
         {+gcs+} bucket, navigate to :guilabel:`IAM and Admin`, then
         navigate to :guilabel:`IAM`.

      #. Click :guilabel:`Grant Access`. In the modal that appears, in
         the :guilabel:`New principals` field, enter the {+gcp+}
         Service Account associated with your {+fdi+}.

      #. To grant read-only access to the bucket, apply the
         ``storage.viewer`` role. To grant read-write access to the bucket,
	 additionally apply the ``storage.editor`` role.

   #. **Optional**. Specify a prefix that {+df+} should use when
      searching the files in the {+gcs+} bucket. If omitted, {+df+}
      does a recursive search for all files from the root of the
      {+gcs+} bucket.

      Corresponds to the ``stores.[n].prefix`` |json| configuration
      setting.

   #. Click :guilabel:`Validate and finish.`


#. Define the path structure for your files in the {+gcs+} bucket and click
   :guilabel:`Next`.

   For example: 

   .. code-block:: sh
     
      https://storage.googleapis.com/<path>/<to>/<files>/<filename>.<file-extension>

   To add additional paths to data on your {+gcs+} bucket, click 
   :guilabel:`Add Data Source` and enter the path. To learn more about 
   paths, see :ref:`adf-path-syntax`.

   Corresponds to the
   ``databases.[n].collections.[n].dataSources.[n].path`` |json|
   configuration setting.

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

   #. Select :guilabel:`{+gcs+}` from the dropdown in the 
      :guilabel:`Data Sources` section.
   #. Drag and drop the data store to map with the collection.

      Corresponds to ``databases.[n].collections.[n].dataSources`` 
      |json| configuration setting.
