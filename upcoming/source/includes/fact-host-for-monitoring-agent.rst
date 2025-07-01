Never install the Monitoring Agent on the same server as a
data bearing :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` instance. This will allow you to
perform maintenance on a the :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` and its host without
affecting the monitoring for your deployment. Additionally a
Monitoring Agent may contend for resources with the :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>`

You can install the Monitoring Agent on the same system as an
:term:`arbiter`, a :manual:`mongos </reference/program/mongos/#mongodb-binary-bin.mongos>`, or an application server
depending on the requirements of these services and available
resources.
