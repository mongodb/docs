.. step:: Write an AND query.

   To write a compound query in MongoDB that matches all of the query
   predicates (i.e. a logical AND), specify all of the fields that you
   wish to match in your find document. By default, MongoDB matches all
   of the fields. If you followed the :ref:`previous guide <guide-read-query>`
   you've already done this!

   The following example retrieves all documents in the ``{+guides-coll+}``
   collection where the ``surfaceTemperatureC.mean`` field is less than ``15``
   **and** the ``surfaceTemperatureC.min`` field is greater than ``-100``.

   .. include:: /includes/crud_find_multiple_operators_and.rst

.. step:: Write an OR query.

   OR queries are required when you want to specify criteria that are
   mutually exclusive. For example, you can't match documents in the
   ``{+guides-coll+}`` collection where the ``orderFromSun`` value is both
   greater than ``7`` AND less than ``2``.

   The following example shows how to use the ``$or`` operator to express
   mutually exclusive criteria.

   .. include:: /includes/crud_find_multiple_operators_or.rst
