Load the Sample Synonyms Source Collection with the Go Driver
-------------------------------------------------------------

Each document in the synonyms source collection describe how one or more
words map to one or more synonyms of those words. To learn more about the
fields and word mapping types in the synonyms source collection documents,
see :ref:`synonyms-coll-format`. 

To begin, you create the synonyms source collection and then add the
collection to the database where you intend to use the synonyms source
collection. In this section, you create one or two sample synonyms source
collections in the ``sample_mflix`` database using the MongoDB Go driver, and then use 
the synonyms source collections with an index of the ``movies`` collection in the same
database.

.. procedure::

   .. step:: Set up and initialize the Go module.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` and initialize your project in that directory: 
      
      .. literalinclude:: /includes/fts/field-types/initialize-project-go.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the
      :ref:`MongoDB Go Driver documentation <go-get-started>`.

   .. step:: Create and populate the synonyms source collections.

      If you are running a free tier {+cluster+} or a {+Flex-cluster+},
      follow the steps in the :guilabel:`Transportation Synonyms` tab to create the collection
      for a single synonym mapping definition in your index. If you have a
      ``M10`` or higher cluster and wish to create multiple synonym
      mappings in your index, follow the steps in the :guilabel:`Multiple Synonyms` tab to create
      both the :guilabel:`Transportation Synonyms` and :guilabel:`Attire Synonyms` collections.

      .. tabs::

         .. tab:: Transport Synonyms
            :tabid: transport

            Create and populate the ``transport_synonyms`` collection:
            
            .. literalinclude:: /includes/fts/tutorials/synonyms/transport_synonyms.go
               :language: go
               :copyable:
               :linenos:
         
         .. tab:: Multiple Synonyms
            :tabid: multiple

            Create and populate both the ``transport_synonyms`` and ``attire_synonyms`` collections:
            
            .. literalinclude:: /includes/fts/tutorials/synonyms/multiple_synonyms.go
               :language: go
               :copyable:
               :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the index.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run file_name.go

         .. output::
            :visible: false

            Synonyms collections successfully created and populated.