.. note::
   |mms| creates a Kerberos Credential (Ticket) Cache for each agent
   automatically when Kerberos is enabled. If you want to override the
   location of the 
   `Kerberos Credential Cache <https://web.mit.edu/kerberos/krb5-latest/doc/basic/ccache_def.html>`_,
   you must set the ``KRB5CCNAME`` environment variable to the desired
   file name and path before running the agent.
