.. note::
   Prior to version 3.2.3, queries using the :pipeline:`$match` or :dbcommand:`mapReduce` operators 
   are not reflected in the ``ops`` field number, although they may use the index.