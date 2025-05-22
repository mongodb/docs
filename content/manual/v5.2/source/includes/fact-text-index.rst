To run legacy text search queries, you must have a ``text`` index on 
your collection. MongoDB provides :ref:`text indexes 
<index-feature-text>` to support text search queries on string content. 
``text`` indexes can include any field whose value is a string or an 
array of string elements. A collection can only have **one** text 
search index, but that index can cover multiple fields.
