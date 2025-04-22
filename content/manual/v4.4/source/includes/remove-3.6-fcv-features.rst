Remove all persisted features that are :ref:`incompatible
<3.6-compatibility-enabled>` with 3.4. For example, if you have defined
any any view definitions, document validators, and partial index
filters that use 3.6 query features such as :query:`$jsonSchema` or
:query:`$expr`, you must remove them.
