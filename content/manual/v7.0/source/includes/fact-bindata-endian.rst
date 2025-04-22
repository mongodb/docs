The :term:`endianness` of your system depends on the architecture of 
your machine. Numbers in BSON data are always stored as 
:term:`little-endian`, if your system is :term:`big-endian` this means 
that numeric data is converted between big and little endian.

In the context of the bit-test match expression operators:

- :query:`$bitsAnySet`
- :query:`$bitsAnyClear`
- :query:`$bitsAllSet` 
- :query:`$bitsAllClear` 

:bsontype:`BinData <Binary>` values act as 
`bitmasks <https://en.wikipedia.org/wiki/Mask_(computing)>`__ and are 
interpreted as though they are arbitrary-length unsigned little-endian 
numbers. The lowest-addressable byte is always interpreted as the least
significant byte. Similarly, the highest-addressable byte in the ``BinData``
is always interpreted as the most significant byte.

