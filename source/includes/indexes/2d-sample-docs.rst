Create the ``contacts`` collection:

.. code-block:: javascript

   db.contacts.insertMany( [
      {
         name: "Evander Otylia",
         phone: "202-555-0193",
         address: [ 55.5, 42.3 ]
      },
      {
         name: "Georgine Lestaw",
         phone: "714-555-0107",
         address: [ -74, 44.74 ]
      }
   ] )

The ``address`` field contains :ref:`legacy coordinate pairs
<geospatial-legacy>`. 
