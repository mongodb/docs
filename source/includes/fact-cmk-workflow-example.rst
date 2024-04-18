Consider the following encryption hierarchy for a three-node replica set.
|service| uses the |cmk| from |cloud-kms| to encrypt a unique
MongoDB Master Key for each node in the {+cluster+}. Each node also contains 
three databases, each of which is encrypted with a unique
per-database encryption key. When the {+cluster+} starts up, 
|service| decrypts the MongoDB Master Key by using the |cmk| from 
|cloud-kms| and supplies this to the MongoDB Server.

.. note:: 
    
   If you revoke |service|'s access to the |cmk|, |service| shuts down the 
   nodes in your {+cluster+} and you can't access your data until 
   you restore access to the |cmk|.
