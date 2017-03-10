Connectivity
++++++++++++

You must :doc:`configure the network infrastructure 
</reference/firewall-configuration>` of your deployment so that:

- the :term:`Monitoring Agent` can connect to all :program:`mongod` and
  :program:`mongos` instances that you want to monitor.

.. only:: cloud

   - the Monitoring Agent can connect to ``api-agents.mongodb.com`` on
     port ``443`` (:abbr:`HTTPS (Secure HyperText Transport
     Protocol)`).

.. only:: onprem

   - the Monitoring Agent can connect to |mms| on port ``8080``
     if it is using :abbr:`HTTP (HyperText Transport Protocol)` or
     ``8443`` if :doc:`it is using HTTPS </tutorial/configure-monitoring-agent-for-ssl>`.

|mms| does not make *any* outbound connections to the agents
or to MongoDB instances. If :ref:`Exposed DB Host Check is enabled
<exposed-hosts-alert>`, |mms| will attempt to connect to
your servers occasionally as part of a vulnerability check.

Ensure all :program:`mongod` and :program:`mongos` instances are not
accessible to hosts outside your deployment.
