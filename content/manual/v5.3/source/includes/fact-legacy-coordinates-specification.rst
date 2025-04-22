To specify data as legacy coordinate pairs, you can use either an
array (*preferred*) or an embedded document.

Specify via an array (*Preferred*):
  .. code-block:: javascript

     <field>: [ <x>, <y> ]

  If specifying latitude and longitude coordinates, list the
  **longitude** first and then **latitude**; i.e.

  .. code-block:: javascript

     <field>: [<longitude>, <latitude> ]

  .. include:: /includes/extracts/geospatial-valid-long-lat-values.rst

Specify via an embedded document:
  .. code-block:: javascript

     <field>: { <field1>: <x>, <field2>: <y> }

  If specifying latitude and longitude coordinates, the first field,
  regardless of the field name, must contains the **longitude** value
  and the second field, the **latitude** value ; i.e.

  .. code-block:: javascript

     <field>: { <field1>: <longitude>, <field2>: <latitude> }

  .. include::  /includes/extracts/geospatial-valid-long-lat-values.rst

To specify legacy coordinate pairs, arrays are preferred over an
embedded document as some languages do not guarantee associative map
ordering.
