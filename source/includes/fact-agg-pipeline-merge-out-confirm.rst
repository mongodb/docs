Some aggregation operators, like :pipeline:`$merge` and 
:pipeline:`$out`, can modify your collection's data.

If your aggregation pipeline contains operators that can modify 
your collection's data, you are prompted for confirmation before 
the pipeline is executed.