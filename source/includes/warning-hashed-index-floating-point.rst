.. warning::

   MongoDB ``hashed`` indexes truncate floating point numbers to 64-bit integers
   before hashing. For example, a ``hashed`` index would store the same
   value for a field that held a value of ``2.3``, ``2.2``, and ``2.9``.
   To prevent collisions, do not use a ``hashed`` index for floating
   point numbers that cannot be reliably converted to 64-bit
   integers (and then back to floating point). MongoDB ``hashed`` indexes do
   not support floating point values larger than 2\ :sup:`53`.
