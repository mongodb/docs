- Integers within the 32-bit signed range become ``int``.

- Integers outside the 32-bit range but within the 64-bit signed range
  become ``long``.

- Integers outside the 64-bit signed range become ``double``, which can
  result in loss of precision.

- Numbers with a decimal point or exponent notation become ``double``.
