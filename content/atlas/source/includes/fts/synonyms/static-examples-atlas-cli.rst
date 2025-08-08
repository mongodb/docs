Use Static Mappings
-------------------

.. include:: /includes/fts/synonyms/static-intro.rst
   
.. procedure::
   :style: normal

   .. step:: Create a ``static-index.json`` configuration file and specify the ``synonyms`` field.

      .. literalinclude:: /includes/fts/synonyms/create-static-index-cli.json
         :language: json
         :linenos:
         :caption: static-index.json
         :copyable: true

   .. step:: Connect to the {+atlas-cli+} 

      In your terminal, connect to your |service| cluster from the 
      {+atlas-cli+}. To learn more, see 
      :atlascli:`Connect from the Atlas CLI </connect-atlas-cli/>`.

   .. step:: Create an |fts| index.

      Run the :atlascli:`atlas clusters search indexes create </command/atlas-clusters-search-indexes-create/>`
      command in your terminal, replacing ``<clusterName>`` with the 
      name of the cluster, and ``<path-to-file>`` with the 
      path to the ``static-index.json`` file:

      .. code-block:: shell
         :copyable: true
         :linenos:

         atlas clusters search indexes create <clusterName> --file <path-to-file>