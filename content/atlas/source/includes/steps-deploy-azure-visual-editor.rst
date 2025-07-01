a. Select the dataset for your {+fdi+} from the :guilabel:`Data Sources` section.

   Click :guilabel:`Add Data Sources` to select your data store.

#. Specify your data store.

   Choose :guilabel:`Azure` to configure a {+fdi+} for data in {+az-bs+}
   containers. 

   Corresponds to :datalakeconf-azure:`stores.[n].provider` |json| 
   configuration setting.

#. Select an |azure| Service Principal for |service|.

   You can select an existing |azure| Service Principal that |service| is  
   authorized for from the Service Principal dropdown or choose 
   :guilabel:`Authorize an Azure Service Principal` to authorize a new
   service principal.  
  
   If you selected an existing service principal that |service| is
   authorized for, proceed to the next step. 
  
   If you are authorizing |service| for an existing service principal or
   are creating a new service principal, complete the following steps
   before proceeding to the next step:
  
   i. Select :guilabel:`Authorize an Azure Service Principal` to
      authorize a new or existing service principal and click
      :guilabel:`Continue`. 

      Use the |azure| Service Principal *AppId* in the :guilabel:`Add
      Atlas to your Azure Service Principal` section to grant |service|
      access through an existing or new |azure| Service Principal. 

   #. Follow the steps in the :guilabel:`PowerShell` or
      :guilabel:`AzureCLI` tab in the {+atlas-ui+} to create a new
      service prinicpal or modify an existing service principal. 

   #. Enter the tenant ID and Service Principal ID in the respective
      fields after completing the steps in the {+atlas-ui+}.

   #. Click :guilabel:`Validate and Finish` to proceed to the next step. 

#. Configure access to your {+az-bs+}.

   In the :guilabel:`Configure Azure Blob Storage` page, you must
   configure |azure| Storage Account credential delegation and Storage
   Container access. To do these: 

   i. Enter your Storage Account Resource ID in the :guilabel:`Storage
      Account Credential Delegation` field.

      To learn more, see `Get the resource ID for a storage account
      <https://learn.microsoft.com/en-us/azure/storage/common/storage-account-get-info?tabs=portal>`__. 

   #. Copy and run the command from the :guilabel:`Storage Account
      Credential Delegation` step in your |azure| PowerShell 
      to set up the credentials delegation. 

   #. Specify whether the storage container allows :guilabel:`Read only`
      or :guilabel:`Read and write` operations.

      |service| can only query :guilabel:`Read-only` containers; if you 
      wish to query and save query results to your {+az-bs+} container,
      choose :guilabel:`Read and write`.

      {+adf+} doesn't support writes to your {+az-bs+} container using
      :ref:`$out <adf-out-stage>`. 

   #. Enter your Storage Container name.
  
   #. Copy and run the command shown from the :guilabel:`Storage
      Container Access` step in your |azure| PowerShell to set up blob
      container access. 

   #. Click :guilabel:`Continue`.

#. Define the path structure for your files in the {+az-bs+} container
   and click :guilabel:`Next`.

   i. Enter the storage path to your {+az-bs+} container.

      For example:

      .. code-block:: sh
     
         https://<storage-account>.blob.core.windows.net/<container>/<file-name>

      To add additional paths to data on your {+az-bs+} container, click 
      :guilabel:`Add Data Source` and enter the path. To learn more about 
      paths, see :ref:`adf-path-syntax`.

      Corresponds to 
      :datalakeconf-azure:`databases.[n].collections.[n].dataSources.[n].path` 
      |json| configuration setting.

   #. **Optional**. Specify the partition fields that {+df+} should use
      when searching the files in the {+az-bs+} container and the field
      value type. 
     
      If omitted, {+df+} does a recursive search for all files from the
      root of the {+az-bs+} container. If you don't select a specific field
      value type, {+df+} adds any value in that path in all queries.

      Corresponds to :datalakeconf-azure:`stores.[n].prefix` and
      :datalakeconf-azure:`databases.[n].collections.[n].dataSources.[n].path`
      |json| configuration settings.

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

   #. Select :guilabel:`Azure Blob Storage` from the dropdown in the 
      :guilabel:`Data Sources` section.
   #. Drag and drop the data store to map with the collection.

      Corresponds to ``databases.[n].collections.[n].dataSources`` 
      |json| configuration setting.
