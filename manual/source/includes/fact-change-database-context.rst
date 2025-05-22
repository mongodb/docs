Use the ``use <database-name>`` helper in :binary:`~bin.mongosh`, or the
following :method:`db.getSiblingDB()` method in an interactive
:binary:`~bin.mongosh` session or in :binary:`~bin.mongosh` shell
scripts to change the ``db`` object:

.. code-block:: javascript

   db = db.getSiblingDB('<database-name>')
