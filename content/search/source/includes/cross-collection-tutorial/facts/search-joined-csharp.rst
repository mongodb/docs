Search Joined Collections
-------------------------

.. include:: /includes/cross-collection-tutorial/facts/search-joined-intro.rst

Create the |fts| Index
~~~~~~~~~~~~~~~~~~~~~~

In this section, you can learn how to create a |fts| index named ``lookup-with-search-tutorial``
on all the fields in the ``sample_analytics.accounts`` collection.

.. include:: /includes/cross-collection-tutorial/procedures/steps-fts-lookup-tutorial-create-index-csharp.rst

Run ``$lookup`` with ``$search`` to Search the Collections 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this section, you can learn how to connect to your deployment and run the
sample query against the indexed collections in the ``sample_analytics`` database. 

.. include:: /includes/cross-collection-tutorial/procedures/steps-fts-lookup-tutorial-run-query-cs.rst
