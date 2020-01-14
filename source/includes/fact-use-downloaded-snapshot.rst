**Example**

The following command uses the ``tar`` utility to extract a ``tar``
archive with ``gzip`` compression:

.. code-block:: shell

   tar -xvzf ~/Downloads/mongodb-snapshots/my-cluster-snapshot.tar.gz

The following command starts a :binary:`~bin.mongod` instance using
the extracted data file directory:

.. code-block:: shell

   mongod --dbpath ~/Downloads/mongodb-snapshots/my-cluster-snapshot/                                                                                                                                                                            