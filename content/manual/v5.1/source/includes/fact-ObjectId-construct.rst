- a 4-byte *timestamp value*, representing the ObjectId's creation,
  measured in seconds since the Unix epoch

- a 5-byte *random value* generated once per process. This random value
  is unique to the machine and process.

- a 3-byte *incrementing counter*, initialized to a random value

While the BSON format itself is little-endian, the *timestamp* and
*counter* values are big-endian, with the most significant bytes
appearing first in the byte sequence.
