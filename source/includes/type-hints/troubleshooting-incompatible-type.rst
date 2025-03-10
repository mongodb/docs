Incompatible Type
~~~~~~~~~~~~~~~~~

If you specify ``MongoClient`` as a type hint but don't include data types for
the document, keys, and values, your type checker might show an error similar to
the following:

.. code-block:: python

   error: Dict entry 0 has incompatible type "str": "int";
   expected "Mapping[str, Any]": "int"

The solution is to add the following type hint to your ``MongoClient`` object:

.. code-block:: python
  
   ``client: MongoClient[Dict[str, Any]]``