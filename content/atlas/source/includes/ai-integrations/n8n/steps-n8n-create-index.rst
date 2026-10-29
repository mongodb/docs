.. procedure::
   :style: normal

   .. step:: Create a new |n8n| workflow.

      Click :guilabel:`+`, and then click :guilabel:`New workflow`.

   .. step:: Add a Manual Trigger node.

      a. Click :guilabel:`Add first step` to open the node menu.
      #. Search for :guilabel:`Manual Trigger`, and then select it to add
         the node to the canvas.

   .. step:: Add a MongoDB node.

      a. Select the :guilabel:`+` connector on the Manual Trigger node.
      #. Search for :guilabel:`MongoDB`, and then select the MongoDB node.

   .. step:: Configure the MongoDB node.

      Select the MongoDB credentials that you configured, and then
      specify the following values:

      .. list-table::
         :widths: 35 65
         :header-rows: 1

         * - Setting
           - Value
         * - :guilabel:`Resource`
           - :guilabel:`Search Index`
         * - :guilabel:`Operation`
           - :guilabel:`Create Search Index`
         * - :guilabel:`Collection`
           - ``embedded_movies``
         * - :guilabel:`Index Name`
           - ``vector_index``
         * - :guilabel:`Index Type`
           - :guilabel:`Vector Search`

      For :guilabel:`Index Definition`, paste the following index
      definition. This definition indexes the ``plot_embedding`` field
      as the ``vector`` type with ``1536`` dimensions:

      .. literalinclude:: /includes/ai-integrations/n8n/n8n-vector-index.json
         :language: json
         :category: snippet

   .. step:: Run the node to create the index.

      Click :guilabel:`Execute step`. When the node runs successfully,
      the output panel displays the name of the index.

      MongoDB builds the index in the background. You can use the index
      in your workflows after the build completes.
