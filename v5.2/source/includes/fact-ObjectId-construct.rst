- A 4-byte timestamp, representing the ObjectId's creation, measured
  in seconds since the Unix epoch.

- A 5-byte random value generated once per process. This random value
  is unique to the machine and process.

- A 3-byte incrementing counter, initialized to a random value.

While the BSON format itself is little-endian, the timestamp and
counter values are big-endian, the most significant bytes appear first
in the byte sequence.

If an integer value is used to create an ObjectId, the integer replaces
the timestamp.

