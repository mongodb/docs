To create a ``2d`` index, use the :method:`db.collection.createIndex()`
method, specifying the location field as the key and the string literal
``"2d"`` as the index type:

.. code-block:: javascript

   db.collection.createIndex( { <location field> : "2d" } )

where the ``<location field>`` is a field whose value is a :ref:`legacy
coordinates pair <geospatial-legacy>`.
