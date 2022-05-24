Run the following command in your terminal to create a unique index on the
``keyAltNames`` field in your ``encryption.__keyVault`` collection using
:binary:`~bin.mongosh`:

.. code-block:: sh

   mongosh --eval "db.getSiblingDB('encryption').getCollection('__keyVault').createIndex({keyAltNames: 1}, { unique: true});"
