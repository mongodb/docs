Create the |fts| Index   
-----------------------------

The synonym mapping in a collection's :ref:`index <synonyms-ref>` 
specifies the synonyms source collection and the analyzer to use 
with the collection. 

In this section, you create a |fts| index that defines one or many synonym
mappings for the ``sample_mflix.movies`` collection. The mapping definition
in the index references the synonyms source collection that you created
in the ``sample_mflix`` database. 

.. |search-type| replace:: :guilabel:`Atlas Search`
.. |index-name| replace:: ``synonyms-tutorial``
.. |database-name| replace:: ``sample_mflix`` database
.. |collection-name| replace:: ``movies`` collection
   
.. include:: /includes/fts/synonyms/procedures/steps-fts-synonyms-tutorial-create-index.rst
