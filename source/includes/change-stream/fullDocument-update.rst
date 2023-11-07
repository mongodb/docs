
This field only appears if you configured the change stream with 
``fullDocument`` set to ``updateLookup``. When you configure the change stream
with ``updateLookup``, the field represents the current 
majority-committed version of the document modified by the update operation.
The document may differ from the changes described in 
:ref:`updateDescription <|idref|-updateDescription>` if any other 
majority-committed operations have modified the document between the original 
update operation and the full document lookup.

For more information, see :ref:`Lookup Full Document for Update Operations
<change-streams-updateLookup>`.

