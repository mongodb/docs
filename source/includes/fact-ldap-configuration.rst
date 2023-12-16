These settings configure |mms| to use an LDAP server for
authentication. If you use LDAP authentication, users must belong to an
LDAP group to log into |mms|. You must create LDAP groups for each
|mms| :doc:`user role </reference/user-roles>`.

*Settings that begin with* ``mms.ldap.global.role`` assign |mms|
:ref:`global roles <global-roles>` to the members of the specified LDAP
groups. Specify groups using the format used by the LDAP attribute
specified in the :setting:`LDAP User Group` setting. You can specify
multiple groups using the ``;;`` delimiter. To change the default
delimiter, use the :setting:`mms.ldap.group.separator` setting. Each
|mms| global role provides its level of access to all the |mms|
:doc:`projects </tutorial/manage-projects>` in the deployment. To
provide access to specific groups, use 
:doc:`group-level roles </reference/user-roles>`.
