
``wildcardProjection`` works with specifications like:

.. code-block:: javascript
   :copyable: false

   { "$**": 1 }  
   { "userID":, "$**": 1 }  

However, you can't define an index that includes the same field in the
wildcard fields and the regular (non-wildcard) fields. To define the
index correctly, use a ``wildcardProjection`` to exclude duplicated
fields from the wildcard pattern.

``wildcardProjection`` does not work with a specification like:

.. code-block:: javascript
   :copyable: false

    ``{ "path.to.field.$**" : 1 }``  
