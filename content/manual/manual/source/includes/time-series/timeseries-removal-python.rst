When you create a :ref:`time series collection
<manual-timeseries-collection>`, you can set up automatic removal of
documents older than a specified number of seconds by using the
``expireAfterSeconds`` property:

.. literalinclude:: /code-examples/tested/python/pymongo/timeseries/auto_removal.snippet.create-timeseries-collection-for-removal.py
   :language: python
   :category: syntax example
   :emphasize-lines: 8

The expiration threshold is the ``timeField`` field value plus the
specified number of seconds. Consider the following document in the
``weather24h`` collection:

.. literalinclude:: /code-examples/tested/python/pymongo/timeseries/findone_output.txt
   :language: json

The document has a timestamp of ``"2021-11-19T18:00:00Z"`` and the
``expireAfterSeconds`` value is set to 86400 seconds (one day). The
document will expire from the database at ``"2021-11-20T18:00:00Z"``. 

.. note::
   
   Once all documents in a bucket are expired, the background task that removes expired 
   buckets removes the bucket during the next run. See
   :ref:`timeseries-collection-delete-operations-timing` for more
   information.

Create or Change Expiration Time
--------------------------------

To enable automatic removal of documents on a :ref:`time
series collection <manual-timeseries-collection>` that doesn't have an expiration, 
or to modify the expiration time on an existing collection, change the 
``expireAfterSeconds`` parameter value, using the :dbcommand:`collMod` command:

   .. literalinclude:: /code-examples/tested/python/pymongo/timeseries/auto_removal.snippet.modify-timeseries-collection-for-removal.py
      :language: python
      :category: syntax example
      :emphasize-lines: 3

Retrieve the Current Value of ``expireAfterSeconds``
----------------------------------------------------

To retrieve the current value of ``expireAfterSeconds``, use the
``list_collections`` method. The result document contains the 
``options.expireAfterSeconds`` field for the timeseries collection. 

.. io-code-block::
   :copyable:

   .. input:: /code-examples/tested/python/pymongo/timeseries/auto_removal.snippet.get-timeseries-collection-expiry.py
      :language: python
      :emphasize-lines: 1

   .. output:: /code-examples/tested/python/pymongo/timeseries/listcollections_output.txt
      :language: json
      :emphasize-lines: 8-9


Disable Automatic Removal
-------------------------

To disable automatic removal, use the :dbcommand:`collMod` command to
set ``expireAfterSeconds`` to ``off``:

.. literalinclude:: /code-examples/tested/python/pymongo/timeseries/auto_removal.snippet.remove-expireAfterSeconds.py
   :language: python
   :category: syntax example
   :emphasize-lines: 3
