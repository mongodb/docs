:gold:`IMPORTANT:` If you use the :manual:`$out </reference/operator/aggregation/out>`
aggregation stage to modify a collection with an existing |fts| index, 
you must delete and re-create the search index. If possible,
consider using :manual:`$merge </reference/operator/aggregation/merge>`
instead of ``$out``.