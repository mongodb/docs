Starting in MongoDB 5.0, non-transaction reads are not allowed on 
the :data:`config.transactions` collection with the following
read concerns and options:

- :readconcern:`"snapshot"`
- :readconcern:`"majority"` and the 
  :ref:`afterClusterTime<afterClusterTime>` option is set
- When using a :driver:`MongoDB Driver </>`  
  and :readconcern:`"majority"`
  within a :ref:`causally consistent session<sessions>`