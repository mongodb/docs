.. important:: 

   The parent directory of the ``saslauthd`` Unix domain socket file
   specified to :setting:`security.sasl.saslauthdSocketPath` or
   :parameter:`--setParameter saslauthdPath <saslauthdPath>` must grant 
   read and execute  (``r-x``) permissions for either: 

   - The user starting the :binary:`mongod <bin.mongod>` or 
     :binary:`mongos <bin.mongos>`, *or* 
   - A group to which that user belongs.

   The :binary:`~bin.mongod` or :binary:`~bin.mongos` cannot successfully authenticate via
   ``saslauthd`` without the specified permission on the ``saslauthd`` 
   directory and its contents.
