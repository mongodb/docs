.. note:: Using UUID Instead of ObjectId

   In general, you can use ``UUID`` for any fields that function as a unique
   identifier. Using ``UUID`` might be particularly useful if you are migrating
   data not stored in MongoDB since it is likely that your object's unique
   identifiers are already of a ``UUID`` type. Alternatively, using ``ObjectId``
   might be useful for a collection of data that already exists in MongoDB.