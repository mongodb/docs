The {+mdbagent+} interacts with the MongoDB databases in your
deployment as a MongoDB user would. As a result, you must configure
your MongoDB deployment and the {+mdbagent+} to support authentication.

You can specify the deployment's authentication mechanisms when
:doc:`adding </tutorial/add-existing-mongodb-processes>` the
deployment, or you can :doc:`edit the settings
</tutorial/edit-host-authentication-credentials>` for an existing
deployment. At minimum, the deployment must enable the authentication
mechanism you want the {+mdbagent+} to use. The {+mdbagent+} can use
any supported :doc:`authentication mechanism
</tutorial/edit-host-authentication-credentials>`.
