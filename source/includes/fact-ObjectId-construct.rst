- a 4-byte *timestamp value*, representing the ObjectId's creation,
  measured in seconds since the Unix epoch

- a 5-byte *random value*

- a 3-byte *incrementing counter*, initialized to a random value

While the BSON format itself is little-endian, the *timestamp* and
*counter* values are big-endian, with the most significant bytes
appearing first in the byte sequence.
