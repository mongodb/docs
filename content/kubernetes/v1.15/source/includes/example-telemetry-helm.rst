.. code-block:: yaml

   operator:
     telemetry:
       # Enables telemetry. Setting this to "false" will stop all telemetry.
       enabled: true
       # Adds RBAC clusterRole for kube-system UID detection for the Kubernetes cluster UID.
       # Adds RBAC clusterRole for RBAC for nodes. We are listing exactly one node to detect the cluster provider (for example, eks).
       # Adds RBAC clusterRole for /version query for detecting Kubernetes server version. 
       installClusterRole: true
       collection:
         # Controls how often the Kubernetes Operator collects and saves the data to the telemetry ConfigMap. It doesn't control whether this data is sent to MongoDB for analysis.
         # Valid time units for frequency are "m", or "h". Anything less than one minute defaults to 1h.
         frequency: 1h
         # Enables the Kubernetes Operator to collect and send cluster-level telemetry.
         # Note: the cluster UUID is unique but random and MongoDB has no way to map this to a customer.
         clusters:
           enabled: true
         # Enables the Kubernetes Operator to collect and send deployment-level telemetry.
         deployments:
           enabled: true
         # Enables the Kubernetes Operator to collect and send Kubernetes Operator-level telemetry.
         operators:
           enabled: true
       # Enables sending the collected telemetry to MongoDB.
       send:
         enabled: true
         # Controls how often the Kubernetes Operator sends the collected the data to MongoDB for analysis.
         # Valid time units are "h". Anything less than one hour defaults to 168h, which is one week.
         frequency: 168h