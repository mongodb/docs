Internally, :ref:`document-bson-type-date` objects are stored as a signed
64-bit integer representing the number of milliseconds since the Unix
epoch (Jan 1, 1970).

Not all database operations and drivers support the full 64-bit range.
You may safely work with dates with years within the inclusive range
``0`` through ``9999``.
