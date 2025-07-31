Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Create a ``search-index.json`` configuration file and specify the ``boolean`` type.

      .. literalinclude:: /includes/fts/field-types/boolean/create-index-basic-placeholders.json
         :language: json
         :linenos:
         :caption: search-index.json
         :copyable: true
   
   .. step:: Connect to the {+atlas-cli+} 

      In your terminal, connect to your local deployment from the 
      {+atlas-cli+}. To learn more, see 
      :atlascli:`Connect from the Atlas CLI </connect-atlas-cli/>`.

   .. step:: Create an |fts| index.

      Run the :atlascli:`atlas clusters search indexes create </command/atlas-clusters-search-indexes-create/>`
      command in your terminal, replacing ``<path-to-file>`` with the 
      path to the ``search-index.json`` file: 
      
      .. literalinclude:: /includes/fts/field-types/boolean/create-index-cli-local.sh
         :language: shell
         :copyable: true