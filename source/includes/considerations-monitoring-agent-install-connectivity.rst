Connectivity
++++++++++++

You must :doc:`configure the network infrastructure 
</reference/firewall-configuration>` of your deployment so that:

- the Monitoring Agent can connect to all :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` and
  :manual:`mongos </reference/program/mongos/#mongodb-binary-bin.mongos>` instances that you want to monitor.

- the Monitoring Agent can connect to |mms| on port ``8080``
  if it is using :abbr:`HTTP (Hypertext Transfer Protocol)` or
  ``8443`` if :doc:`it is using HTTPS </tutorial/configure-mongodb-agent-for-tls>`.

|mms| does not make *any* outbound connections to the agents
or to MongoDB instances. If :ref:`Exposed DB Host Check is enabled
<exposed-hosts-alert>`, |mms| will attempt to connect to
your servers occasionally as part of a vulnerability check.

Ensure all :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` and :manual:`mongos </reference/program/mongos/#mongodb-binary-bin.mongos>` instances are not
accessible to hosts outside your deployment.
