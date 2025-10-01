Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Create a ``search-index.json`` configuration file and specify the ``token`` type.

      .. literalinclude:: /includes/fts/field-types/token/search-index-cli.json
         :language: json
         :linenos:
         :caption: search-index.json
         :copyable: true
   
   .. step:: Connect to the {+atlas-cli+} 

      In your terminal, connect to your cluster from the 
      {+atlas-cli+}. To learn more, see 
      :atlascli:`Connect from the Atlas CLI </connect-atlas-cli/>`.

   .. step:: Create a |fts| index.

      Run the :atlascli:`atlas clusters search indexes create </command/atlas-clusters-search-indexes-create/>`
      command in your terminal, replacing ``<clusterName>`` with the 
      name of the cluster, and ``<path-to-file>`` with the 
      path to the ``search-index.json`` file:
      
      .. literalinclude:: /includes/fts/field-types/token/create-index-cli.sh
         :language: shell
         :copyable: true