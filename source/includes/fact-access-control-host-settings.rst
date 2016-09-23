MongoDB :term:`agents <agent>` interact with the MongoDB databases in your
deployment as a MongoDB user would. Each agent must be authenticated and then
granted privileges according to what their roles are on your deployment. As a
result, you must configure your MongoDB deployment and your agents to support 
authentication.

You can specify the deployment's authentication mechanisms when 
:doc:`adding </tutorial/add-existing-mongodb-processes>` the deployment, or 
you can :doc:`edit the settings </tutorial/edit-host-authentication-credentials>` 
for an existing deployment. At minimum, the deployment must enable the Kerberos
authentication mechanism you want the agents to use.

Adding an :term:`agent` as a MongoDB user requires configuring an 
:manual:`authentication </core/authentication>` mechanism. Agents can use any 
supported :doc:`authentication mechanism </tutorial/edit-host-authentication-credentials>`, 
but all agents must use the same mechanism. 

For the purposes of this tutorial, you must ensure your:

- Deployment supports Kerberos authentication and
- Agents use Kerberos authentication.

See :doc:`/tutorial/enable-kerberos-authentication-for-group` for how to
enable Kerberos authentication.