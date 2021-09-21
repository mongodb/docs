1. Set **auth.newAutoPwd** and leave **auth.autoPwd** with its 
   current password.
      
#. Wait for the goal state.

#. **auth.newAutoPwd** copies over the **auth.autoPwd**
   password automatically.
   
.. note::
   
   You can set this option only when you include SCRAM-SHA-1 
   or SCRAM-SHA-256 as one of the authentication 
   mechanisms for the {+aagent+} in **auth.autoAuthMechanisms**.
