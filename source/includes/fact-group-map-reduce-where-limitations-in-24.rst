In MongoDB 2.4, :dbcommand:`map-reduce operations <mapReduce>`, the
:dbcommand:`group` command, and :query:`$where` operator expressions
**cannot** access certain global functions or properties, such as
``db``, that are available in the :program:`mongo` shell.

When upgrading to MongoDB 2.4, you will need to refactor your code if
your :dbcommand:`map-reduce operations <mapReduce>`, :dbcommand:`group`
commands, or :query:`$where` operator expressions include any global
shell functions or properties that are no longer available, such as
``db``.

The following JavaScript functions and properties **are available** to
:dbcommand:`map-reduce operations <mapReduce>`, the :dbcommand:`group`
command, and :query:`$where` operator expressions in MongoDB 2.4:

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
