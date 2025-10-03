Install MongoDB Search and MongoDB Vector Search
------------------------------------------------

.. important:: 

   |fts| and {+avs+} with MongoDB Community is in Preview. The feature and
   the corresponding documentation might change at any time during the
   Preview period. To learn more, see `Preview Features
   <https://www.mongodb.com/docs/preview-features/>`__. 

You can install the search process, ``mongot``, in MongoDB Community Edition. The search
process is available for deployment as a tarball with the ``.tgz`` extension.

.. note::

   To onboard more quickly with a deployment meant for experimentation, see the
   :atlas:`MongoDB Search Quick Start Tutorial </atlas-search/tutorial>` and
   select the Self-Managed deployment type.  

Before You Begin
~~~~~~~~~~~~~~~~

To use ``mongot`` in a self-managed deployment, you must have the following prerequisites.

- MongoDB Community Edition. See :ref:`install-mdb-community-edition` for installation tutorials.  
- An initiated replica set with keyfile access control.

If you have not already initiated a replica set with keyfile access
control, you can use the optional steps in the procedure to 
create and initiate a replica set.

Procedure
~~~~~~~~~

.. include:: /includes/search-in-community/tarball-deploy-procedure.rst

Next Steps
~~~~~~~~~~

- Create :atlas:`MongoDB Search indexes </atlas-search/searching/>`
- Create :atlas:`MongoDB Vector Search indexes </atlas-vector-search/vector-search-type/>`