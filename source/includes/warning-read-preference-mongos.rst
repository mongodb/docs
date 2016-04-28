.. warning::
 
   Using a :ref:`read preference<replica-set-read-preference>` other than 
   :readmode:`primary` with a connection to a :program:`mongos` may produce
   inconsistencies, duplicates, or result in missed documents. 