Create the |fts| Index
~~~~~~~~~~~~~~~~~~~~~~

Create a |fts| index named ``lookup-with-search-tutorial`` on all the
fields in the ``sample_analytics.accounts`` collection.

.. include:: /includes/fts/lookup-with-search/procedures/steps-fts-lookup-tutorial-create-index-compass.rst

Run ``$lookup`` with ``$search`` to Search the Collections 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Connect to your cluster and run the sample query against the
indexed collections in the ``sample_analytics`` database. 

.. include:: /includes/fts/lookup-with-search/procedures/steps-fts-lookup-tutorial-run-query-compass.rst