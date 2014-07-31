Never install the Monitoring Agent on the same server as a
data bearing :program:`mongod` instance. This will allow you to
perform maintenance on a the :program:`mongod` and its host without
affecting the monitoring for your deployment. Additionally a
Monitoring Agent may contend for resources with the :program:`mongod`

You can install the Monitoring Agent on the same system as an
:term:`arbiter`, a :program:`mongos`, or an application server
depending on the requirements of these services and available
resources.
