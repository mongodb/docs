To get output suitable for automated parsing, use
``EJSON.stringify()``.

.. code-block:: javascript

  mongosh --quiet  --host rs0/centos1104 --port 27500 \
          --eval "EJSON.stringify(rs.status().members.map( \
            m => ({'id':m._id, 'name':m.name, 'stateStr':m.stateStr})));" \
  | jq 

After parsing with ``jq``, the output resembles this:

.. code-block:: javascript
   :copyable: false

   [
     {
        "id": 0,
        "name": "centos1104:27500",
        "stateStr": "PRIMARY"
     },
     {
        "id": 1,
        "name": "centos1104:27502",
        "stateStr": "SECONDARY"
     },
     {
        "id": 2,
        "name": "centos1104:27503",
        "stateStr": "SECONDARY"
     }
   ]

.. note::

   ``EJSON`` has built in formatting options which may eliminate the
   need for a parser like ``jq``. For example, the following code
   produces output that is formatted the same as above. 

   .. code-block:: javascript
      :emphasize-lines: 3

      mongosh --quiet  --host rs0/centos1104 --port 27500 \
              --eval "EJSON.stringify( rs.status().members.map( \
                ({ _id, name, stateStr }) => ({ _id, name, stateStr })), null, 2);" 

