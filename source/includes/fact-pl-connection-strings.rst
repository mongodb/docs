When a client in your |vpc| connects to an |service| 
{+database-deployment+} using one of these private endpoint-aware
connection strings, the client attempts to
establish a connection to the load balancer in the |service| |vpc|
through one of the :term:`interface endpoints <interface endpoint>`.
Your client's |dns| resolution mechanism handles which of the interface
endpoints the hostname resolves to. If one interface endpoint is
unavailable the next is used. This is opaque to the driver or other
connection mechanism. The driver is only aware of the hostname in the
SRV record or in the connection string.
