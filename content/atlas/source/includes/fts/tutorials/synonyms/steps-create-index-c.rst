Create the |fts| Index  
-----------------------------

The synonym mapping in a collection's :ref:`index <synonyms-ref>` 
specifies the synonyms source collection and the analyzer to use 
with the collection. 

In this section, you create a |fts| index that defines one or many synonym
mappings for the ``sample_mflix.movies`` collection. The mapping definition
in the index references the synonyms source collection that you created
in the ``sample_mflix`` database. 

.. procedure::
   :style: normal

   .. step:: Define the index.

      To run the simple example query only, use the index definition in 
      the **Single Synonym Mapping** tab below. If you have an ``M10`` or 
      higher {+cluster+} and if you loaded both the example synonyms source 
      collections, you can run both the simple and advanced example queries 
      using the index definition that specifies multiple synonym mappings 
      in the **Multiple Synonym Mappings** tab below.
      
      .. tabs:: 
      
         .. tab:: Single Synonym Mapping
            :tabid: single
            
            Create a ``create_index.c`` file in your project directory, 
            and copy and paste the following code into the file.  
            The following index definition specifies: 
      
            - The :ref:`language analyzer <ref-language-analyzers>` 
              ``lucene.english`` as the default analyzer for both indexing 
              and querying the ``title`` field.
            - The name ``transportSynonyms`` as the name for this synonym 
              mapping.
            - The ``transport_synonyms`` collection as the source synonyms 
              collection to look for synonyms for queries using 
              ``transportSynonyms`` mapping. ``transportSynonyms`` can be 
              used in text queries over any field indexed with the 
              ``lucene.english`` analyzer (including the ``title`` field, 
              in this example). 

            .. literalinclude:: /includes/fts/tutorials/synonyms/create_index.c
               :caption: create_index.c
               :language: c
               :linenos:
               :copyable:

         .. tab:: Multiple Synonym Mappings
            :tabid: multiple
            
            Create a ``create_index_multiple.c`` file in your project directory, 
            and copy and paste the following code into the file.  
            The following index definition specifies:
            
            - The :ref:`language analyzer <ref-language-analyzers>` 
              ``lucene.english`` as the default analyzer for both indexing 
              and querying the ``title`` field.
            - Two synonym mappings: ``transportSynonyms`` and ``attireSynonyms``.
            - The ``transport_synonyms`` collection as the source for the 
              ``transportSynonyms`` mapping.
            - The ``attire_synonyms`` collection as the source for the
              ``attireSynonyms`` mapping.

            .. literalinclude:: /includes/fts/tutorials/synonyms/create_index_multiple.c
               :caption: create_index_multiple.c
               :language: c
               :linenos:
               :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Set up a CMake application

      To configure your application, create a ``CMakeLists.txt`` file in
      your project directory. Then, add the following code to the file:

      .. literalinclude:: /includes/fts/field-types/initialize-cmake-c.rst
         :caption: CMakeLists.txt
         :language: txt
         :linenos:
         :copyable:

      The preceding code performs the following actions:
      
      - Configures a C project.
      - Creates a ``index.out`` executable for your application.
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
            cmake --build cmake-build --target index.out
            ./cmake-build/index.out

         .. output::
            :visible: false

            Index created!