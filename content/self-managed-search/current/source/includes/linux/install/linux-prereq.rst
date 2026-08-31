To install ``mongot`` in a self-managed deployment, you must have the 
following prerequisites:

- MongoDB Community Edition v8.3 or later.

  See :ref:`install-mdb-community-edition` for installation tutorials.

  .. note::

     You must have MongoDB 8.3 or later to run {+fts+} and {+avs+}
     process, whether you use a standalone self-managed deployment
     or deploy with the {+k8s-op+}. For more information, see
     :ref:`mongot-compatibility-requirements`.

- An initiated replica set with keyfile access control.
