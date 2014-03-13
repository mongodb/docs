Assigning Roles with LDAP
~~~~~~~~~~~~~~~~~~~~~~~~~

First, create groups on your LDAP server for each of the available MMS
group-level and global roles.

To assign LDAP groups to MMS roles, click the Admin link at the top right of
any MMS page, then click the Groups tab on the Admin page. Click the pencil
icon at the far right of a group name. Edit the Roles interface by adding the
appropriate LDAP group name to its corresponding MMS group name.

Because MMS does not update role assignments stored in your LDAP server, assign
roles by assigning users to groups in your LDAP server.

Configure global roles in ``conf-mms.properties`` file.

See :doc:`</management/tutorial/authenticate-with-ldap>` for more details about
LDAP integration with MMS.
