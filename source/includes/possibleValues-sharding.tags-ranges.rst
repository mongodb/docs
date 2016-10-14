Specify the field name, field type, and value in a document of the
following form.

.. code-block:: cfg

   {
     "field" : <string>, 
     "fieldType" : <string>,
     "value" : <string>
   }

``fieldType`` must be one of the following:

- ``string``
- ``integer``
- ``long``
- ``double``
- ``decimal``
- ``date``
- ``timestamp``
- ``oid``
- ``minKey``
- ``maxKey``

``value`` must be passed in as a string value.

To use a compound shard key, specify each field in a separate document, as
shown in the example after this table. For more information on shard keys, see
:manual:`Shard Keys </core/sharding-shard-key>` in the MongoDB manual.
