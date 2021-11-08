|service| runs an index sufficiency query to determine the efficiency 
of the archival process. If the number of documents scanned to the 
number of documents returned is 10 or more, the query result triggers 
an  ``Index Sufficiency Warning``. This warning indicates that you have 
insufficient indexes for an efficient archival process. For date-based 
archives, you must index the date field. For custom criteria that use 
an expression, |service| might first convert a value before it 
evaluates it against the query.
