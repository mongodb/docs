The data type for the embeddings returned. Defaults to 
``"float"``. Options: ``float``, ``int8``, ``uint8``, ``binary``, 
``ubinary``.

- ``float``: Each returned embedding is a list of 32-bit (4-byte) 
  single-precision floating-point numbers. This is the default and 
  provides the highest precision and retrieval accuracy.
- ``int8`` and ``uint8``: Each returned embedding is a list of 8-bit 
  (1-byte) integers ranging from -128 to 127 and 0 to 255, 
  respectively.
- ``binary`` and ``ubinary``: Each returned embedding is a list of 
  8-bit integers that represent bit-packed, quantized single-bit 
  embedding values: int8 for ``binary`` and uint8 for ``ubinary``. The 
  length of the returned list of integers is 1/8 of the 
  ``output_dimension`` (which is the actual dimension of the 
  embedding). The ``binary`` type uses the offset binary method.