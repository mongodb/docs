If you're connecting to a multi-cloud {+deployment+} through a 
:ref:`private connection <conn-string-options>`, you can access only the 
nodes in the same cloud provider that you're connecting from. This 
cloud provider might not have the :term:`primary` node in its region. 
When this happens, you must specify the :manual:`secondary read preference 
</core/read-preference/>` mode in the connection string to access the 
{+deployment+}.

If you need access to all nodes for your multi-cloud {+deployment+} from
your current provider through a private connection, you must:

- Configure a VPN in the current provider to each of the remaining 
  providers.
- Configure a :ref:`private endpoint <private-endpoint>` to |service| 
  for each of the remaining providers.
