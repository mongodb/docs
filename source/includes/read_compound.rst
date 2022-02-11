.. step:: Write an implied AND query.
  
   To write a compound query in MongoDB that matches all of the query
   predicates (i.e. a logical AND), specify all of the fields that you
   wish to match in your find document. By default, MongoDB matches all
   of the fields.
    
   The following example retrieves all documents in the ``inventory``
   collection where the ``status`` equals ``"A"`` **and** ``qty`` is less
   than (:query:`$lt`) ``30``:

   .. include:: /includes/driver-example-query-11.rst

   MongoDB also provides a :query:`~op.$and` logical operator as part of
   its logical query operators, but the "implied AND" described above is
   a more common pattern.

.. step:: Iterate over the results.

   .. include:: /includes/iterate_all_noshellcursor.rst

.. step:: Check your results.
  
   If you have loaded data into your test database, you will see one or
   more JSON documents returned. Your results should look something like
   the JSON below. Note that the record below has a ``status`` of ``"A"``
   and a ``qty`` less than ``30`` per the criteria in the compound query.
  
   .. include:: /includes/results_read5a.rst
  
.. step:: Write an "or" query.
  
   .. include:: /includes/driver-query-12-intro.rst
  
   The following example retrieves all documents in the collection where
   the ``status`` equals ``"A"`` **or** ``qty`` is less than
   ``30``:

   .. include:: /includes/driver-example-query-12.rst

.. step:: Iterate over the results.
  
   .. include:: /includes/iterate_all.rst

.. step:: Check your results.
  
   If you have loaded data into your test database, you will see one or
   more JSON documents returned. Note that the record has a ``status`` of ``"A"``
   but a ``qty`` of more than ``30``, which is acceptable according to
   the :query:`$or` criteria.
  
   .. include:: /includes/results_read6.rst

