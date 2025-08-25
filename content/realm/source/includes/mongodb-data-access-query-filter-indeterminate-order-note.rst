.. note::

   Each operation described on this page uses a **query** to
   match certain documents in the collection upon which the operation
   executes. When a filter matches multiple documents in a collection,
   they are returned in an :manual:`indeterminate order
   </reference/method/cursor.sort/#return-in-natural-order>` unless you
   specify a sorting parameter. This means that if you do not specify
   a sort for the ``findOne()``, ``updateOne()``, or ``deleteOne()``
   functions, your operation could match *any* document that matches the
   query. For more information on sorting, see
   :manual:`cursor.sort() </reference/method/cursor.sort>`.
