Create a |fts| Index
---------------------

.. collapsible::
   :heading: What is a Search Index?
   :expanded: false

   A |fts| index is a data structure that categorizes data in an easily
   searchable format. It maps terms with documents that
   contain those terms to enable fast retrieval of documents
   at query-time. 
   
   You must configure a |fts| index to query data using |fts|. 
   We recommend that you index the fields that you regularly 
   use to sort or filter your data.

   To learn more, see :ref:`fts-manage-indexes`.

In this section, you create a |fts| index on the sample :ref:`movies
<mflix-movies>` collection.

.. |search-type| replace:: :guilabel:`MongoDB Search`
.. |index-name| replace:: ``default``
.. |collection| replace:: ``movies`` collection
.. |collection-name| replace:: ``movies`` collection
.. |database| replace:: ``sample_mflix`` database
.. |database-name| replace:: ``sample_mflix`` database
.. |index-name| replace:: ``default``
