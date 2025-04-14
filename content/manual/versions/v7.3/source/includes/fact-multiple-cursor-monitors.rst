MongoDB provides multiple ways to iterate on a cursor. 

The :method:`cursor.hasNext()` method blocks and waits for the next
event. To monitor the ``watchCursor`` cursor and iterate over the
events, use ``hasNext()`` like this:

.. code-block:: javascript

   while (!watchCursor.isClosed()) {
      if (watchCursor.hasNext()) {
        firstChange = watchCursor.next();
        break;
      }
   }

The :method:`cursor.tryNext()` method is non-blocking. To monitor
the ``watchCursor`` cursor and iterate over the events, use
``tryNext()`` like this:

.. code-block:: javascript

   while (!watchCursor.isClosed()) {
     let next = watchCursor.tryNext()
     while (next !== null) {
       printjson(next);
       next = watchCursor.tryNext()
     }
   }
