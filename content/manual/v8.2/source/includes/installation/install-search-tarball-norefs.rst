Install MongoDB Search and MongoDB Vector Search
------------------------------------------------

.. important:: 

   |fts| and {+avs+} with MongoDB Community is in Preview. The feature and
   the corresponding documentation might change at any time during the
   Preview period. To learn more, see `Preview Features
   <https://www.mongodb.com/docs/preview-features/>`__. 

You can install the search process, ``mongot``, with MongoDB Community
Edition. The search process is available for deployment as a tarball with 
the ``.tgz`` extension. The ``mongot`` process supports full-text search 
and semantic search with your own embeddings or automated embedding.

.. note::

   To onboard more quickly with a deployment meant for experimentation, see the 
   following tutorials for Self-Managed deployments:

   - :atlas:`MongoDB Search Quick Start </atlas-search/tutorial/?deployment-type=self>`  
   - :atlas:`MongoDB Vector Search Quick Start </atlas-vector-search/tutorials/vector-search-quick-start/?deployment-type=self>`

Before You Begin
~~~~~~~~~~~~~~~~

Before you deploy ``mongot``, you must complete the following steps:

a. Download MongoDB Community Edition. See
   :ref:`install-mdb-community-edition` for installation tutorials. 
#. Initiate a replica set with keyfile access control.

   If you have not already initiated a replica set with keyfile access
   control, you can use the optional steps in the procedure to create
   and initiate a replica set. 
  
#. .. include:: /includes/installation/auto-embed-shared-prereq.rst

Procedure
~~~~~~~~~

.. include:: /includes/search-in-community/tarball-deploy-procedure.rst

Next Steps
~~~~~~~~~~

- Create :atlas:`MongoDB Search indexes </atlas-search/searching/>`
- Create :atlas:`MongoDB Vector Search indexes </atlas-vector-search/vector-search-type/>`