
The ``resultMaterialization`` document shows the amount of time ``mongot`` takes
to accomplish the following:

a. Retrieve result data stored in Lucene in the form of either ``_id`` or
   ``storedSource``.
#. Serialize the data into |bson| format before sending it to ``mongod``.

To learn more, see :ref:`explain-timing-breakdown`.
