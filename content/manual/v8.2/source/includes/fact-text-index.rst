To run ``$text`` queries, you must have a :ref:`text index <index-feature-text>` 
on your collection. MongoDB provides text indexes to support ``$text`` queries 
on string content. Text indexes can include any field whose value is a string or 
an array of string elements. A collection can only have **one** text index, but 
that index can cover multiple fields.
