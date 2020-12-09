.. example:: Finding the latest Oplog Entry

   To find the latest Oplog entry, run the following query
   in a :binary:`~bin.mongo` shell:

   .. code-block:: javascript

      db.getSiblingDB('local').oplog.rs.find().sort({$natural:-1}).limit(1).pretty()

   .. code-block:: json
      :copyable: false
      :emphasize-lines: 2

      {
        "ts": Timestamp(1537559320, 1),
        "h": NumberLong("-2447431566377702740"),
        "v": 2,
        "op": "n",
        "ns": "",
        "wall": ISODate("2018-09-21T19:48:40.708Z"),
        "o": {
          "msg": "initiating set"
        }
      }

   The parts of the ``ts`` value correspond to the values
   you need for the :guilabel:`Timestamp` and
   :guilabel:`Increment` boxes.

   .. note::
      To translate the epoch time into a human-readable
      timestamp, try using a tool like
      `Epoch Converter <https://www.epochconverter.com/>`__ 

      MongoDB does not endorse this service. Its reference
      is intended only as informational. 
