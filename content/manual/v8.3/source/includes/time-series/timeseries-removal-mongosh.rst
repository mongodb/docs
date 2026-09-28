When you create a :ref:`time series collection
<manual-timeseries-collection>`, you can set up automatic removal of
documents older than a specified number of seconds by using the
``expireAfterSeconds`` parameter:

.. code-block:: javascript

   db.createCollection(
       "weather24h",
       {
          timeseries: {
             timeField: "timestamp",
             metaField: "metadata",
             granularity: "hours"
          },
          expireAfterSeconds: 86400
       }
   )

The expiration threshold is the ``timeField`` field value plus the
specified number of seconds. Consider the following document in the
``weather24h`` collection:

.. code-block::

   {
      "metadata": {"sensorId": 5578, "type": "temperature"},
      "timestamp": ISODate("2021-05-18T10:00:00.000Z"),
      "temp": 12
   }


The document would expire from the database at
``"2021-05-19T10:00:00.000Z"``. Once all documents in a bucket are
expired, the background task that removes expired buckets removes the
bucket during the next run. See
:ref:`timeseries-collection-delete-operations-timing` for more
information.

Enable Automatic Removal on a Collection
----------------------------------------

To enable automatic removal of documents for an existing :ref:`time
series collection <manual-timeseries-collection>`, issue the following
:dbcommand:`collMod` command:

.. code-block:: javascript

   db.runCommand({
      collMod: "weather24h",
      expireAfterSeconds: 604801
   })

Change the ``expireAfterSeconds`` Parameter
-------------------------------------------

To change the ``expireAfterSeconds`` parameter value, issue the following
:dbcommand:`collMod` command:

.. code-block:: javascript

   db.runCommand({
      collMod: "weather24h",
      expireAfterSeconds: 604801
   })

Retrieve the Current Value of ``expireAfterSeconds``
----------------------------------------------------

To retrieve the current value of ``expireAfterSeconds``, use the
:dbcommand:`listCollections` command:

.. code-block:: javascript

   db.runCommand( { listCollections: 1 } )

The result document contains a document for the time series collection
which contains the ``options.expireAfterSeconds`` field.

.. code-block:: javascript
  :copyable: false

  {
      cursor: {
         id: <number>,
         ns: 'test.$cmd.listCollections',
         firstBatch: [
           {
              name: <string>,
              type: 'timeseries',
              options: {
                 expireAfterSeconds: <number>,
                 timeseries: { ... }
              },
              ...
           },
           ...
         ]
      }
   }

Disable Automatic Removal
-------------------------

To disable automatic removal, use the :dbcommand:`collMod` command to
set ``expireAfterSeconds`` to ``off``:

.. code-block:: javascript

   db.runCommand({
       collMod: "weather24h",
       expireAfterSeconds: "off"
   })
