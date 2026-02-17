When you configure a private endpoint, |service| generates DNS
seedlist and standard private endpoint-aware connection strings:

- DNS seedlist connection

  .. code-block:: none
     :copyable: false

     mongodb+srv://cluster1-psc-0.4uyx2d.mongodb.net

- Standard connection string

  .. code-block:: none
     :copyable: false

     mongodb://pl-0-us-east1-gcp.4uyx2d.mongodb.net:1024,pl-0-us-east1-gcp.4uyx2d.mongodb.net:1025,pl-0-us-east1-gcp.4uyx2d.mongodb.net:1026/?ssl=true&authSource=admin&replicaSet=atlas-uiq444-shard-0

When a client in your network connects to an |service| cluster using one
of these private endpoint-aware connection strings, the client attempts to
establish a connection to the service attachments in the |service| |vpc| 
through the private endpoints. The service attachments send traffic through
|gcp| internal load balancers to the |service| cluster nodes that you deployed
in that region. Your client's |dns| resolution mechanism handles resolving the 
hostname to the endpoint's private IP address. 