.. note:: _id Field Must Be Unique

   In a MongoDB collection, each document must contain an ``_id`` field
   with a unique value.

   If you specify a value for the ``_id`` field, you must ensure that the
   value is unique across the collection. If you don't specify a value,
   the driver automatically generates a unique ``ObjectId`` value for the field.

   We recommend letting the driver automatically generate ``_id`` values to
   ensure uniqueness. Duplicate ``_id`` values violate unique index constraints, which
   causes the driver to return an error. 