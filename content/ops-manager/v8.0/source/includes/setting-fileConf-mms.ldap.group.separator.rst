.. setting:: mms.ldap.group.separator

   *Type*: string

   *Default*: ``;;``

   
   To set the |ldap| separator, follow the :ref:`Modify a Custom Setting
   <opsmgr-config-add-custom>` procedure using the following values:
   
   .. list-table::
      :widths: 20 80
   
      * - :guilabel:`Key`
        - ``mms.ldap.group.separator``
      * - :guilabel:`Value`
        - ``<desired-separator>``
   
   Each of the global role values takes a delimited list of projects:
   
   .. code-block:: ini
   
      "dbas,sysadmins"
   
   If a group value contains the delimiter, the delimiter must be set
   to another value.
   
   .. example::
      
      If you have the group value ``"CN\=foo,DN\=bar"`` and the
      delimiter is ``,`` then |mms| parses ``"CN\=foo,DN\=bar"`` as two
      elements rather than as the description for a single group.
   
   

