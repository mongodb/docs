.. note::

   When |ldap| authentication is enabled, database users must override 
   the following parameters in the connection string for their
   clients:

   * ``authSource`` must be ``$external``
   * ``authenticationMechanism`` must be ``PLAIN``