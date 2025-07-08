Driver Throws a Timeout During Server Selection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Each driver operation requires that you choose a server that
satisfies the :manual:`server selection criteria
</core/read-preference-mechanics>`. If you do not select an appropriate
server within the `server selection timeout <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.MongoClientSettings.ServerSelectionTimeout.html>`__, the driver throws a
server selection timeout exception. The exception looks similar to the
following:

.. code-block:: none

   A timeout occurred after 30000ms selecting a server using CompositeServerSelector{ Selectors = MongoDB.Driver.MongoClient+AreSessionsSupportedServerSelector, LatencyLimitingServerSelector{ AllowedLatencyRange = 00:00:00.0150000 }, OperationsCountServerSelector }.
   Client view of cluster state is 
   { 
       ClusterId : "1", 
       Type : "Unknown", 
       State : "Disconnected", 
       Servers : 
       [{
           ServerId: "{ ClusterId : 1, EndPoint : "Unspecified/localhost:27017" }",
           EndPoint: "Unspecified/localhost:27017",
           ReasonChanged: "Heartbeat",
           State: "Disconnected",
           ServerVersion: ,
           TopologyVersion: ,
           Type: "Unknown",
           HeartbeatException: "<exception details>"
       }] 
   }.

The error message consists of multiple parts:

1. The server selection timeout (30000 ms).
#. The server selectors considered (``CompositeServerSelector``
   containing ``AreSessionsSupportedServerSelector``,
   ``LatencyLimitingServerSelector``, and
   ``OperationsCountServerSelector``).
#. The driver’s current view of the cluster topology. The list of
   servers that the driver is aware of is a key part of this view. Each
   server description contains an exhaustive description of its current
   state including information about an endpoint, a server version, a
   server type, and its current health state. If the server encounters issues in
   reporting its health, ``HeartbeatException`` contains the exception from the
   last failed heartbeat. Analyzing the ``HeartbeatException`` on each
   cluster node can assist in diagnosing most server selection issues.
   The following heartbeat exceptions are common:
   
   * ``No connection could be made because the target machine actively
     refused it``: The driver cannot see this cluster node. This might be
     because the cluster node has crashed, a firewall is preventing
     network traffic from reaching the cluster node or port, or some other
     network error is preventing traffic from being successfully routed to
     the cluster node.
   * ``Attempted to read past the end of the stream``: This error
     happens when the driver cannot connect to the cluster nodes due to a
     network error, misconfigured firewall, or other network issue. To
     address this exception, ensure that all cluster nodes are reachable.
     This error commonly occurs when the client machine’s IP address is
     not configured in the Atlas IPs Access List, which you can find under
     the :guilabel:`Network Access` tab for your Atlas Project.
   * ``The remote certificate is invalid according to the validation
     procedure``: This error typically indicates a TLS/SSL-related problem
     such as an expired/invalid certificate or an untrusted root CA. You
     can use tools like ``openssl s_client`` to debug TLS/SSL-related
     certificate problems.
