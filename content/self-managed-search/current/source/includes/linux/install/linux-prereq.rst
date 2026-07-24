To install ``mongot`` in a self-managed deployment, you must have the 
following prerequisites:

- MongoDB Community Edition v8.2 or later.

  See :ref:`install-mdb-community-edition` for installation tutorials.

  .. note::

     You must have MongoDB 8.2 or later to run {+fts+} and {+avs+}
     process with a standalone self-managed deployment. If you deploy
     with the {+k8s-op+}, you need MongoDB 8.3 or later instead. For
     more information, see :ref:`mongot-compatibility-requirements`.

- An initiated replica set with keyfile access control.
