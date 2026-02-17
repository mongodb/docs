To specify data as legacy coordinate pairs, you can use either an
array (*preferred*) or an embedded document.

Array:
  .. code-block:: javascript

     <field>: [ <x>, <y> ]

  When you use longitude and latitude, list longitude first, then latitude:

  .. code-block:: javascript

     <field>: [ <longitude>, <latitude> ]

  .. include:: /includes/extracts/geospatial-valid-long-lat-values.rst

Embedded document:
  .. code-block:: javascript

     <field>: { <field1>: <x>, <field2>: <y> }

  If you use longitude and latitude, the first field must be longitude and
  the second must be latitude:

  .. code-block:: javascript

     <field>: { <field1>: <longitude>, <field2>: <latitude> }

  .. include:: /includes/extracts/geospatial-valid-long-lat-values.rst

Use arrays for legacy coordinate pairs because some languages 
do not preserve object field ordering.
