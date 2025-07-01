#. Click :guilabel:`LDAP Group`, and then enter the full DN of the
   group containing your database users, even if you enabled
   :guilabel:`User to DN Mapping`. Follow this template:

   .. code-block:: sh
        
      CN=<group-name>,OU=AADDC Users,DC=<managed-domain>,DC=com

   .. include:: /includes/fact-azure-managed-domain-ldap.rst    

   For example, if your ``<group-name>`` is ``Atlas read only`` and 
   your ``<managed-domain>`` is ``aadds.example.com``, your user's 
   DN is:

   .. code-block:: sh
      :copyable: false
        
      CN=Atlas read only,OU=AADDC Users,DC=aadds,DC=example,DC=com
