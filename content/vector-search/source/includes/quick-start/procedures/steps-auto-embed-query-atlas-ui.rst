.. procedure::
   :style: normal

   .. include:: /includes/shared/procedures/steps-atlas-search.rst
      
   .. step:: Go to the :guilabel:`Search Tester` to run a query against the index.
      
      Click the :guilabel:`Query` button to the right of the index to 
      query.
      
   .. step:: View and edit the query syntax.
      
      Click :guilabel:`Edit Query` to view a default query syntax 
      sample in |json| format.
      
   .. step:: Run a {+fts+} query with the ``compound`` and ``autocomplete`` operators on the ``movies`` collection.
      
      Copy and paste the following query into the :guilabel:`Query Editor`, 
      and then click the :guilabel:`Search` button in the 
      :guilabel:`Query Editor`.
      
      .. io-code-block::
         :copyable: true

         .. input:: /includes/quick-start/code-snippets/auto-embed/json/compass-query.json
            :language: json
            :linenos:

         .. output:: /includes/quick-start/code-snippets/output/autoembed-atlas-ui-query-output.js
            :visible: false
            :language: json
            :linenos:

      For details on all the {+avs+} query settings for Automated Embedding, see 
      :ref:`$vectorSearch syntax <vectorSearch-agg-pipeline-syntax>`.
