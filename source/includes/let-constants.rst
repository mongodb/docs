Specifies a document with a list of constants that can be used elsewhere
in the command. This supports tasks that could otherwise only be
performed using the :dbcommand:`mapReduce` command, and reduces the risk
of MQL injection attacks. The document syntax is:

.. code-block:: javascript
   :copyable: false

   { <constant_name_1>: <value_1>,
     ...,
     <constant_name_n>: <value_n> }
  
For example: ``{ targetTotal: 3000 }``

Constants must be named according to the :ref:`user variable naming
conventions<agg-user-variables>`.

To access a constant elsewhere in the command, use the double dollar
sign prefix (``$$``) together with your constant name in the form
``$$<constant_name>``. For example: ``$$targetTotal``