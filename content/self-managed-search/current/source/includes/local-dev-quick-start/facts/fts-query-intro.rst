This query searches for the term ``courtroom lawyer`` in the ``plot`` 
field of the ``movies`` collection using the ``movie-index`` index. The 
query uses the ``fuzzy`` option to enable fuzzy matching. The query 
returns the top 3 results and projects only the ``title`` and ``plot`` 
fields.