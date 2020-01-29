Starting in MongoDB 4.4, you cannot specify both an embedded document
and a field within that embedded document in the same projection.

The following projection document fails with a ``Path collision``
error because it attempts to project both the embedded ``size``
document and the ``size.uom`` field:

.. code-block:: javascript
   :copyable: false

   db.inventory.find( {}, { size: 1, "size.uom": 1 } )

The error occurs regardless of the order in which the parent document
and embedded field are specified. The following example fails with
the same error:

.. code-block:: javascript
   :copyable: false

   db.inventory.find( {}, { "size.uom": 1, size: 1 } )

.. include:: /includes/fact-projection-collision-prior-4.4-size.rst
