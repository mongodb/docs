#. Click :guilabel:`LDAP Group`, and then enter the full DN of the
   group containing your database users, even if you enabled
   :guilabel:`User to DN Mapping`. Follow this template:

   .. code-block:: sh

      cn=<group-name>,ou=groups,dc=<onelogin-instance-id>,dc=onelogin,dc=com

   For example, if your ``<group-name>`` is ``db-read`` and your 
   ``<onelogin-instance-id>`` is ``mdb-example``, your bind user's DN is:

   .. code-block:: sh
      :copyable: false
   
      cn=db-read,ou=groups,dc=mdb-example,dc=onelogin,dc=com