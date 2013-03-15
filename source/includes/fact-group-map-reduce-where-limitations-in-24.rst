In MongoDB 2.4, :doc:`map-reduce operations
</applications/map-reduce>`, the :dbcommand:`group` command, and
:operator:`$where` operator expressions **cannot** access certain
global functions or properties, such as ``db``, that are available
in the :program:`mongo` shell.

When upgrading to MongoDB 2.4, you will need to refactor your code if
your :doc:`map-reduce operations </applications/map-reduce>`,
:dbcommand:`group` commands, or :operator:`$where` operator expressions
include any global shell functions or properties that are no longer
available, such as ``db``.

The following shell functions and properties **are available** to
:doc:`map-reduce operations </applications/map-reduce>`, the
:dbcommand:`group` command, and :operator:`$where` operator expressions
in MongoDB 2.4:

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
      | ``sleep()``
      | ``Timestamp()``
      | ``tojson()``
      | ``tojsononeline()``
      | ``tojsonObject()``
      | ``UUID()``
      | ``version()``
