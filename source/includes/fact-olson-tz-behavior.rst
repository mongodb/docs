When using an Olson Timezone Identifier in the ``<timezone>``
field, MongoDB applies the :abbr:`DST (Daylight Savings Time)` offset
if applicable for the specified timezone.

For example, consider a ``sales`` collection with the following document:

.. code-block:: javascript

   {
      "_id" : 1,
      "item" : "abc",
      "price" : 20,
      "quantity" : 5,
      "date" : ISODate("2017-05-20T10:24:51.303Z")
   }

The following aggregation illustrates how MongoDB handles the DST
offset for the Olson Timezone Identifier. The example uses the
:expression:`$hour` and :expression:`$minute` operators to return the
corresponding portions of the ``date`` field:

.. code-block:: javascript

   db.sales.aggregate([
   {
      $project: { 
         "nycHour": { 
            $hour: { date: "$date", timezone: "-05:00" }
          }, 
          "nycMinute": { 
             $minute: { date: "$date", timezone: "-05:00" }
          },
          "gmtHour": {
             $hour: { date: "$date", timezone: "GMT" }
          },
          "gmtMinute": {
             $minute: { date: "$date", timezone: "GMT" } },
          "nycOlsonHour": {
             $hour: { date: "$date", timezone: "America/New_York" }
          },
          "nycOlsonMinute": {
             $minute: { date: "$date", timezone: "America/New_York" }
          }
      }
   }])

The operation returns the following result:

.. code-block:: javascript

   {
      "_id": 1,
      "nycHour" : 5,
      "nycMinute" : 24,
      "gmtHour" : 10,
      "gmtMinute" : 24,
      "nycOlsonHour" : 6,
      "nycOlsonMinute" : 24
   }