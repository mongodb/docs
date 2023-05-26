
Restart the primary member:

#. Connect to the primary using :program:`mongosh`, then use the
   :method:`rs.stepDown` method to step the member down as the
   primary:

   .. code-block:: javascript
   
      rs.stepDown()    
   
   The cluster promotes a secondary with the new certificate to serve
   as the new primary.

#. Use the :method:`db.shutdownServer` method to shut the server down:

   .. code-block:: javascript
   
      use admin
      db.shutdownServer()
   
#. Restart the server. 

