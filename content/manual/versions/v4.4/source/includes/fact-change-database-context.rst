Use the ``use <database-name>`` helper in the interactive
:binary:`~bin.mongo` shell, or the following :method:`db.getSiblingDB()`
in the interactive shell or in :binary:`~bin.mongo` shell scripts to
change the ``db`` object:

.. code-block:: javascript

   db = db.getSiblingDB('<database-name>')
