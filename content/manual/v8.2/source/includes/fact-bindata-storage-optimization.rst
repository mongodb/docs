Index keys that are of the ``BinData`` type are more efficiently stored
in the index if:

- the binary subtype value is in the range of 0-7 or 128-135, and

- the length of the byte array is: 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12,
  14, 16, 20, 24, or 32.
