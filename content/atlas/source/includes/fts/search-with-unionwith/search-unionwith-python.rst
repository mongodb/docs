Combine Query Results
---------------------

.. include:: /includes/fts/search-with-unionwith/search-with-unionwith-intro.rst

Create the |fts| Indexes
~~~~~~~~~~~~~~~~~~~~~~~~

In this section, you can learn how to create an |fts| index named ``default`` on 
all the fields in the ``companies`` collection in the 
``sample_training`` database. You will create another |fts| index 
named ``default`` on all the fields in the ``inspections`` 
collection in the ``sample_training`` database.

.. include:: /includes/fts/search-with-unionwith/procedures/steps-fts-unionwith-tutorial-create-index-python.rst

Run ``$unionWith`` with ``$search`` to Search the Collections 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this section, you can learn how to connect to your deployment and run
the sample query against the indexed collections in the ``sample_training`` database.

.. include:: /includes/fts/search-with-unionwith/procedures/steps-fts-unionwith-tutorial-run-query-python.rst
