Your {+key-vault-long+} is the MongoDB collection you use to store 
encrypted {+dek-long+} ({+dek-abbr+}) documents. {+dek-abbr+} documents
are BSON documents that contain DEKs and have the following structure:

.. dek structure from: https://github.com/mongodb/specifications/blob/master/source/client-side-encryption/client-side-encryption.rst#example-data-key-document

.. literalinclude:: /includes/dek_document.json
   :language: json

You create your {+key-vault-long+} as you would a standard MongoDB
collection. Your {+key-vault-long+} must have a
:ref:`unique index <index-type-unique>` on the ``keyAltNames`` field. To
check if the unique index exists, run the :dbcommand:`listIndexes`
command against the {+key-vault-long+}:

.. io-code-block::
   :copyable: true

   .. input::
      :language: json
      :linenos:
   
      db.runCommand({
         listIndexes: "__keyVault",
      });

   .. output::
      :linenos:

      {
         cursor: {
            id: Long("0"),
            ns: 'encryption.__keyVault',
            firstBatch: [ 
               { v: 2, key: { _id: 1 }, name: '_id_' } 
               ]
         },
         ok: 1,
      }

If the unique index does not exist, your application must create it
before performing {+dek-abbr+} management.

To learn how to create a MongoDB collection,
see :ref:`Databases and Collections <collections>`.

.. tip:: mongosh Feature

   The :binary:`~bin.mongosh` method
   :method:`KeyVault.createKey()` automatically creates a
   unique index on the ``keyAltNames`` field if one does not exist.