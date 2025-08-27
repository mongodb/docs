Load the Sample Synonyms Source Collection with the C Driver
------------------------------------------------------------

Each document in the synonyms source collection describe how one or more
words map to one or more synonyms of those words. To learn more about the
fields and word mapping types in the synonyms source collection documents,
see :ref:`synonyms-coll-format`. 

To begin, you create the synonyms source collection and then add the
collection to the database where you intend to use the synonyms source
collection. In this section, you create one or two sample synonyms source
collections in the ``sample_mflix`` database using the MongoDB C driver, and then use 
the synonyms source collections with an index of the ``movies`` collection in the same
database.

.. procedure::

   .. step:: Set up the C project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` for this project: 

      .. literalinclude:: /includes/fts/field-types/initialize-project-c.sh
         :language: shell
         :linenos:
         :copyable: true

      Add the C driver to your project by following the instructions in the 
      `MongoDB C Driver documentation <https://www.mongodb.com/docs/languages/c/c-driver/current/get-started/>`__.

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
            
            .. literalinclude:: /includes/fts/tutorials/synonyms/transport_synonyms.c
               :language: c
               :copyable:
               :linenos:
         
         .. tab:: Multiple Synonyms
            :tabid: multiple

            Create and populate both the ``transport_synonyms`` and ``attire_synonyms`` collections:
            
            .. literalinclude:: /includes/fts/tutorials/synonyms/multiple_synonyms.c
               :language: c
               :copyable:
               :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst
               
   .. step:: Set up a CMake application

      To configure your application, create a ``CMakeLists.txt`` file in
      your project directory. Then, add the following code to the file:

      .. literalinclude:: /includes/fts/tutorials/synonyms/initialize-cmake-c-load.rst
         :caption: CMakeLists.txt
         :language: txt
         :linenos:
         :copyable:

      The preceding code performs the following actions:
      
      - Configures a C project.
      - Creates a ``load.out`` executable for your application.
      - Finds and requires the C driver. Replace the ``<version>``
        placeholder with your C driver version synonyms, such as ``2.0.0``.
      - Links the program to the ``libmongoc`` library.

      .. note::

         In the sample ``CMakeLists.txt`` file, the ``mongoc::mongoc`` target
         points to either the static library or the shared library.
         The library type depends on which one is available and
         whichever type the user specifies in the ``MONGOC_DEFAULT_IMPORTED_LIBRARY_TYPE``
         CMake configuration setting. If you don't set this value and
         both library types are available, ``mongoc::mongoc`` uses
         the static library.

         You can use the ``mongoc::static`` target to explicitly use the 
         static library or the ``mongoc::shared`` target to use the shared
         library.

   .. step:: Create the index.

      In your terminal, run the following commands to build and run this 
      application: 
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cmake -S. -Bcmake-build
            cmake --build cmake-build --target load.out
            ./cmake-build/load.out

         .. output::
            :visible: false

            Synonyms collections successfully created and populated.