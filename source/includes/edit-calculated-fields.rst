#. Edit the mapping rule, when editing a mapping rule you can:

   - Edit the collection name. 
   - Edit field names.
   - Include or exclude a field from your sync job by clicking the 
     :icon-fa5:`check-square` next to the field name.

#. (Optional) Add field customizations to your mapping rule:

   I. Click the :icon-fa5:`chevron-left` icon next to the field 
      you want to customize.

   II. Select a :guilabel:`BSON type`.

   III. Select a :guilabel:`Null handlings` option.

   - :guilabel:`Insert as null` preserves null values, and nulls 
      are inserted into your destination collection.
   - :guilabel:`Omit` skips any null values, and nulls are not 
      inserted into the destination collection.