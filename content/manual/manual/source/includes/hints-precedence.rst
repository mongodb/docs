Cluster query settings take precedence over query settings or 
index hints passed as a command field. MongoDB ignores
index hints in command fields if a matching query
setting already contains index hints. 

Index hints don't affect :ref:`query
shape <query-shapes>`. 

For more information about hints and query
settings, see :ref:`Query Settings Syntax <setQuerySettings-syntax>`.