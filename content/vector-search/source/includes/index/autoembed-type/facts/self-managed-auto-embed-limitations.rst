After creating the index, you can't edit certain fields in the 
``autoEmbed`` type index definition. Specifically, you can't edit 
the ``path``, ``model``, ``quantization``, and ``numDimensions`` 
fields in the index definition. However, you can edit or add ``filter`` 
type fields. If you need to change the index configuration for the 
``autoEmbed`` type fields, you must create a new index with your 
desired configuration and then delete the old index.

You can't configure both ``vector`` and ``autoEmbed`` type fields in 
the same index definition. {+avs+} throws an exception if you 
define fields of both types in the same index.
