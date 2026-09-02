.. selected-content::
   :selections: mongosh, None

   .. code-block:: javascript

      {
         rated: 'G',
         $or: [
           { runtime: { $lt: 90 } },
           { title: { $regex: '^T' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM movies WHERE rated = "G"
      AND ( runtime < 90 OR title LIKE "T%")

.. selected-content::
   :selections: compass, None

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, c

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, python

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, motor

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, java-sync

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, java-async

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, kotlin-coroutine

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, nodejs

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, php

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, ruby

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, scala

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, csharp

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")

.. selected-content::
   :selections: driver, go

   .. code-block:: javascript

      {
         status: 'A',
         $or: [
           { qty: { $lt: 30 } },
           { item: { $regex: '^p' } }
         ]
      }

   which corresponds to the following SQL statement:

   .. code-block:: sql

      SELECT * FROM inventory WHERE status = "A"
      AND ( qty < 30 OR item LIKE "p%")