.. list-table::
   :header-rows: 1

   * - Character Represented
     - Escape Sequence

   * - Quotation Mark (``"``)
     - ``\"``

   * - Backslash (``\``)
     - ``\\``

   * - Backspace (``0x08``)
     - ``\b``

   * - Formfeed (``0x0C``)
     - ``\f``

   * - Newline (``0x0A``)
     - ``\n``

   * - Carriage return (``0x0D``)
     - ``\r``

   * - Horizontal tab (``0x09``)
     - ``\t``

Control characters not listed above are escaped with ``\uXXXX`` where
"XXXX" is the unicode codepoint in hexadecimal. Bytes with invalid
UTF-8 encoding are replaced with the unicode replacement character
represented by ``\ufffd``.
