Your index definition's ``autoEmbed`` field must contain only text. When 
configuring fields for Automated Embedding, the following limitations 
apply: 

- You can't configure both ``vector`` and ``autoEmbed`` type fields in 
  the same index definition. {+avs+} throws an exception if you 
  define fields of both types in the same index.
- You must use the same embedding model for all the ``autoEmbed`` type 
  fields in the same index. {+avs+} throws an exception if you specify 
  multiple models in the same index.
- After {+avs+} creates the index, you can't edit or delete ``autoEmbed`` 
  type fields in the index.