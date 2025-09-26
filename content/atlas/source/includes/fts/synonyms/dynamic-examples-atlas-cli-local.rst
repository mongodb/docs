Use Dynamic Mappings
--------------------

.. include:: /includes/fts/synonyms/dynamic-intro.rst

.. procedure::
   :style: normal

   .. step:: Create a ``dynamic-index.json`` configuration file and specify the ``synonyms`` field.

      .. literalinclude:: /includes/fts/synonyms/create-dynamic-index-cli.json
         :language: json
         :linenos:
         :caption: dynamic-index.json
         :copyable: true

   .. step:: Connect to the {+atlas-cli+} 

      In your terminal, connect to your local deployment from the 
      {+atlas-cli+}. To learn more, see 
      :atlascli:`Connect from the Atlas CLI </connect-atlas-cli/>`.

   .. step:: Create a |fts| index.

      Run the :atlascli:`atlas deployments search indexes create </command/atlas-deployments-search-indexes-create/>`
      command in your terminal, replacing ``<path-to-file>`` with the 
      path to the ``dynamic-index.json`` file:

      .. code-block:: shell
         :copyable: true
         :linenos:

         atlas deployments search indexes create --file <path-to-file>