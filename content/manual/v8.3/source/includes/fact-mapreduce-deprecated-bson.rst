:dbcommand:`mapReduce` no longer supports the deprecated 
:ref:`BSON Type <bson-types>` JavaScript code with scope (BSON Type 15) for its 
functions. The ``map``, ``reduce``, and ``finalize`` functions must be either 
BSON type String (BSON Type 2) or BSON Type JavaScript (BSON Type 13). To 
pass constant values which will be accessible in the ``map``, ``reduce``, and 
``finalize`` functions, use the ``scope`` parameter.

The use of JavaScript code with scope for the :dbcommand:`mapReduce` functions 
has been deprecated since version 4.2.1.