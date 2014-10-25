First, :doc:`configure LDAP authentication </tutorial/configure-for-ldap-authentication>`.

Next, create groups on your LDAP server for each of the available MMS
group-level and global roles.

To assign LDAP groups to MMS roles, click the Admin link at the top
right of any MMS page, then click Monitoring, which displays the Groups
page. Click the pencil
icon at the far right of a group name. Edit the Roles interface by adding
the appropriate LDAP group name to its corresponding MMS group name.

Because MMS does not update role assignments stored in your LDAP server,
assign roles by assigning users to groups in your LDAP server.

Configure global roles in the ``conf-mms.properties``
:doc:`configuration file </reference/configuration>`.

See :doc:`/tutorial/configure-for-ldap-authentication` for more details
about LDAP integration with MMS.
