MongoDB uses the IEEE 754 standard for floating point computations, and
the behavior is consistent with that standard.

If you need a floating point number for an application that requires
high precison, consider a ``Decimal128`` value. For details, see
:ref:`bson-decimal128`.

If you need to store a currency value, consider an integer using the
lowest currency denomination unit. For example, use an integer with
cents or pennies instead of a floating point number.
