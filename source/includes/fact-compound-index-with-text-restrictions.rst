A compound ``text`` index cannot include any other special index types,
such as :ref:`multi-key <index-type-multi-key>` or :ref:`geospatial
<index-feature-geospatial>` index fields.

Any keys following the ``text`` index key can only be **ascending**
index keys; e.g.

.. code-block:: javascript

   { comment: "text", subject: "text", count: 1, posted: 1 }

If the compound ``text`` index includes keys preceding the ``text``
index key, you can only perform a :query:`$text` search if the query
predicate also includes equality match conditions on the preceding keys.
See :doc:`/tutorial/limit-number-of-items-scanned-for-text-search`.
