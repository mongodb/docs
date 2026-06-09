Document Mapping Explosions
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Mapping explosions occur when |fts| indexes a document with arbitrary 
keys and you have a :ref:`dynamic mapping <static-dynamic-mappings>`. 
The ``mongot`` process might consume increasing amounts of memory and 
could crash. If you add too many fields to an index, mapping explosions 
can occur. To address this issue, you can upgrade your cluster or use a 
:ref:`static mapping <static-dynamic-mappings>` that does not index all 
fields in your data.

When searching over fields using a wildcard path, design your search to use 
a tuple-like schema. If you perform a wildcard path search that uses a 
key-value schema, |fts| indexes each key as its own field, 
which can cause mapping explosions.

.. example::

   An example of a key-value schema 
   is as follows:

   .. code-block::

      ruleBuilder: {
        ruleName1: <data>, 
        ruleName2: <data>,
        ..... 
        ruleName1025: <data>
      }
   
   An example of the same data
   restructured to use a tuple-like schema is as follows:

   .. code-block::

      {
        ruleBuilder: [
          {name: ruleName1, data: <data>},
          {name: ruleName2, data: <data>},
          ...
          {name: ruleName1025, data: <data>}
        ]
      } 