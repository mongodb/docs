:dbcommand:`map-reduce operations <mapReduce>` and :query:`$where`
operator expressions **cannot** access certain global functions or
properties, such as ``db``, that are available in the
:binary:`~bin.mongo` shell.

The following JavaScript functions and properties **are available** to
:dbcommand:`map-reduce operations <mapReduce>` and :query:`$where`
operator expressions:

.. list-table::
  :header-rows: 1

  * - Available Properties
    - Available Functions
    -

  * -
      | ``args``
      | ``MaxKey``
      | ``MinKey``

    -
      | ``assert()``
      | ``BinData()``
      | ``DBPointer()``
      | ``DBRef()``
      | ``doassert()``
      | ``emit()``
      | ``gc()``
      | ``HexData()``
      | ``hex_md5()``
      | ``isNumber()``
      | ``isObject()``
      | ``ISODate()``
      | ``isString()``

    -
      | ``Map()``
      | ``MD5()``
      | ``NumberInt()``
      | ``NumberLong()``
      | ``ObjectId()``
      | ``print()``
      | ``printjson()``
      | ``printjsononeline()``
      | ``sleep()``
      | ``Timestamp()``
      | ``tojson()``
      | ``tojsononeline()``
      | ``tojsonObject()``
      | ``UUID()``
      | ``version()``
