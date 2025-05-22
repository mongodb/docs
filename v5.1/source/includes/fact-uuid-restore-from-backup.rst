.. note ::

   *New in version 3.6:*

   All MongoDB collections have
   :abbr:`UUIDs (Universally unique identifiers)` by default. When
   MongoDB restores collections, the restored collections retain their
   original UUIDs. When restoring a collection where no UUID was
   present, MongoDB generates a UUID for the restored collection. 

   For more information on collection UUIDs, see
   `Collections <https://docs.mongodb.com/v3.6/core/databases-and-collections/#collections>`_.