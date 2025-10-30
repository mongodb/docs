a. Copy and paste the sample cURL request in your preferred text editor.

   The following index definition dynamically indexes the fields 
   in the ``movies`` collection.

   .. literalinclude:: /includes/fts/search-index-management/api-create-dynamic-mapping.sh
      :language: sh
      :linenos:

#. Replace the variables in your sample cURL request.

   The sample cURL requests use these variables. Replace these variables 
   with your desired values before running the cURL command to create an
   |fts| index.

   .. list-table::
      :header-rows: 1
      :stub-columns: 1
      :widths: 30 20 50

      * - Name
        - Type
        - Description

      * - PUBLIC_KEY
        - string
        - Your public API Key for your |api| credentials.

      * - PRIVATE_KEY
        - string
        - Your private API Key for your |api| credentials.

      * - GROUP_ID
        - string
        - Unique 24-hexadecimal character string that identifies the
          project that contains the cluster that contains the collection 
          for which you want to create a |fts| index.

      * - CLUSTER_NAME
        - string
        - Human-readable label that identifies the cluster that contains 
          the collection for which you want to create a |fts| index.

          Use the :oas-bump-atlas-op:`API <listgroupclusters>` to get
          the **CLUSTER_NAME**. For each cluster, |service| returns the 
          **CLUSTER_NAME** in the **name** field.

#. Run the modified cURL request to create the |fts| index.

   .. literalinclude:: /includes/fts/search-index-management/api-create-dynamic-mapping-response.json
      :language: json
      :linenos:
