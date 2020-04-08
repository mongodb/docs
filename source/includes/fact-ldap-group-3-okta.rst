c. Click :guilabel:`LDAP Group`, and then enter the full DN of the
   group containing your database users, even if you enabled
   :guilabel:`User to DN Mapping`. Follow this template:

   .. code-block:: sh

      cn=<group-name>,ou=groups,dc=<okta-instance-id>,dc=okta,dc=com

   For example, if your ``<group-name>`` is ``db-read`` and your 
   ``<okta-instance-id>`` is ``mdb-example``, your bind user's DN is:

   .. code-block:: sh
      :copyable: false
   
      cn=db-read,ou=groups,dc=mdb-example,dc=okta,dc=com