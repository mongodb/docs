Use the ``use <database-name>`` helper in :mongosh:`mongosh </>`, or the
following :method:`db.getSiblingDB()` method in an interactive
:mongosh:`mongosh </>` session or in :mongosh:`mongosh </>` shell
scripts to change the ``db`` object:

.. code-block:: javascript

   db = db.getSiblingDB('<database-name>')
