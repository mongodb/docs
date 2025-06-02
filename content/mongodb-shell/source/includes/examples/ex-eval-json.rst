To return statistics about a collection in Extended JSON format using
multiple ``--eval`` statements: 

.. code-block:: sh

   mongosh --quiet --json=relaxed \
           --eval 'use <database-name>' \
           --eval 'db.<collection>.stats()' \
           mongodb://localhost/