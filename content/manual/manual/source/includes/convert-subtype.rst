Starting in MongoDB 8.1, ``$convert`` returns an error when attempting
to convert between different binData subtypes. In MongoDB 8.0,
``$convert`` returns the original value and original subtype: no
conversion is performed. MongoDB versions before 8.0 don't have binData
conversion.
