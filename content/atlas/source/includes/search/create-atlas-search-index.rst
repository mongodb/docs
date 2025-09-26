|fts| is an embedded full-text search feature
that gives you a seamless, scalable experience for building 
relevance-based app features. This quick start describes 
how to get started in the following steps:

1. Create a |fts| index on a sample collection.

#. Build a |fts| query to search the collection.
   You will learn how to:
  
   - Run a basic query to search for a term in a field
   - Use an operator to refine your search
   - Add a search option to process your results

*Time required: 15 minutes*   

.. note:: 

   This tutorial includes examples for a selection of clients. 
   For all supported clients, see the
   :ref:`Indexes <fts-manage-indexes>` and 
   :ref:`Queries <ref-query-management>` pages.

Create a |fts| Index
---------------------

.. collapsible::
   :heading: What is a Search Index?
   :expanded: false

   a |fts| index is a data structure that categorizes data in an easily
   searchable format. It maps terms with documents that
   contain those terms to enable fast retrieval of documents
   at query-time. 
   
   You must configure a |fts| index to query data using |fts|. 
   We recommend that you index the fields that you regularly 
   use to sort or filter your data.

   To learn more, see :ref:`fts-manage-indexes`.

In this section, you create a |fts| index on the sample 
:ref:`movies <mflix-movies>` collection. You can create the 
|fts| index in either an |service| {+cluster+} or a
deployment hosted on your local computer.

.. |search-type| replace:: :guilabel:`Atlas Search`
.. |index-name| replace:: ``default``
.. |collection| replace:: ``movies`` collection
.. |collection-name| replace:: ``movies`` collection
.. |database| replace:: ``sample_mflix`` database
.. |database-name| replace:: ``sample_mflix`` database
.. |index-name| replace:: ``default``
