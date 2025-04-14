When starting a :binary:`~bin.mongod` instance with 
:ref:`TLS/SSL enabled <configure-mongod-mongos-for-tls-ssl>`, you must 
specify a value for the :option:`--tlsCAFile <mongod --tlsCAFile>` flag, the 
:setting:`net.tls.CAFile` configuration option, or the :parameter:`tlsUseSystemCA` 
parameter. 

``--tlsCAFile``, ``tls.CAFile``, and ``tlsUseSystemCA`` are all mutually 
exclusive.
