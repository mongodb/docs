The ``readOnly`` option does not fully disable write operations. Instead, it
hides the UI elements that conduct write operations. You are still connected
to the shell with standard user privileges. 

To enforce read-only access at the database level, assign users the built-in 
:authrole:`read` role. 
