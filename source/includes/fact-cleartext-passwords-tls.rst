.. warning::

   By default, |command| sends all specified data to the MongoDB 
   instance in cleartext. Use TLS transport encryption to protect
   communications between clients and the server, 
   including the password sent by |command|. For 
   instructions on enabling TLS transport encryption, see 
   :doc:`/tutorial/configure-ssl`. 

   MongoDB does not store the password in cleartext. The password
   is only vulnerable in transit between the client and the 
   server, and only if TLS transport encryption is not enabled.