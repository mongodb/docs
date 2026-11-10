When you specify the ``privileges`` array, you can specify :ref:`privileges <privileges>` to apply to
multiple collections in a database or to an entire database.

The following syntax specifies privileges on multiple collections in the
``products`` database. 

.. code-block:: javascript

   privileges: [
        {
        resource: { db: 'products', collection: 'coll1' },
        actions: [ 'bypassDocumentValidation' ]
        },
        {
        resource: { db: 'products', collection: 'coll2' },
        actions: [ 'bypassDocumentValidation' ]
        }     
   ]

The following syntax specifies privileges on all collections in the
``products`` database. 

.. code-block:: javascript

   privileges: [
        {
        resource: { db: 'products', collection: '' },
        actions: [ 'bypassDocumentValidation' ]
        }
   ]
