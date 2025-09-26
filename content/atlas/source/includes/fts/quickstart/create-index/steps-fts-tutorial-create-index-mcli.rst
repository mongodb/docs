a. Create and save the JSON index definition in a file.

   Copy the following sample index definition, then paste the JSON index 
   example into a new file, and save the file:

   The following index definition dynamically indexes the fields in
   the ``movies`` collection.
   
   .. literalinclude:: /includes/fts/search-index-management/mcli-create-dynamic-mapping.json
      :language: json
      :linenos:

#. Copy and modify the sample {+atlas-cli+} request.

   Paste the following sample {+atlas-cli+} request into your favorite text 
   editor and replace the variables.

   .. code-block :: sh

      atlas clusters search index create \
          --clusterName CLUSTER_NAME \
          --file FILE_PATH \
          --projectId PROJECT_ID
          --profile PROFILE_NAME

   The sample {+atlas-cli+} requests use these variables. Replace these 
   variables with your desired values before running the command to 
   create a |fts| index.

   .. list-table::
      :header-rows: 1
      :stub-columns: 1
      :widths: 30 20 50

      * - Name
        - Type
        - Description
      * - PROJECT_ID
        - string
        - Unique 24-hexadecimal character string that identifies the
          project that contains the cluster. The cluster contains the collection
          for which you want to create a |fts| index.
      * - CLUSTER_NAME
        - string
        - Unique 24-hexadecimal character string that identifies the
          cluster. The cluster contains the collection for which you want to
          create a |fts| index.
      * - FILE_PATH
        - string
        - Path to the JSON index file that you created and saved in the previous
          steps, including the ``.json`` file extension.
      * - PROFILE_NAME
        - string
        - **Optional**. Name of the profile that sets the public and private keys for the 
          project. See :atlascli:`Save Connection Settings
          </atlas-cli-save-connection-settings/>` for more information. If you remove the ``--profile``
          flag, the {+atlas-cli+} uses the default profile.

#. Run the modified {+atlas-cli+} request in your terminal to create the |fts| index.

   Run the request. You receive this response when |fts| begins creating the index:

   .. code-block:: json
      :copyable: false

      {
        "collectionName": "movies",
        "database": "sample_mflix",
        "indexID": <index-id>,
        "mappings": {
          "dynamic": true
        },
        "name": <index-name>,
        "status": "IN_PROGRESS"
      }
