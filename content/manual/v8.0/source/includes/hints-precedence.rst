Query settings have higher precedence than index hints. MongoDB ignores
index hints that you pass as command fields when a matching query
setting contains index hints. Index hints don't affect the :ref:`query
shape <query-shapes>`. For more information about hints and query
settings, see :ref:`Query Settings Syntax <setQuerySettings-syntax>`.
