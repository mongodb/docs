.. tabs::
   :hidden: true

   .. tab:: {+Dedicated-Clusters+}
      :tabid: clusters

      When you configure a private endpoint, |service| generates DNS
      seedlist and standard private endpoint-aware connection strings:

      - DNS seedlist connection

        .. code-block:: none
           :copyable: false

           mongodb+srv://cluster0-pl-0.k45tj.mongodb.net

      - Standard connection string

        .. code-block:: none
           :copyable: false

           mongodb://pl-0-us-east-1.k45tj.mongodb.net:1024,pl-0-us-east-1.k45tj.mongodb.net:1025,pl-0-us-east-1.k45tj.mongodb.net:1026/?ssl=true&authSource=admin&replicaSet=Cluster0-shard-0-shard-0

      .. include:: /includes/fact-pl-connection-strings.rst  

      **SRV Record for DNS Seedlist Private Endpoint-Aware Connection 
      Strings**

      The following example shows the SRV record for an {+aws-pl+}
      -enabled single-region {+cluster+}, showing three unique ports 
      defined for ``pl-0-us-east-1.k45tj.mongodb.net``:

      .. code-block:: sh
         :copyable: false
         
         $ nslookup -type=SRV _mongodb._tcp.cluster0-pl-0.k45tj.mongodb.net

         Server: 127.0.0.53
         Address: 127.0.0.53#53

         Non-authoritative answer:
         _mongodb._tcp.cluster0-pl-0.k45tj.mongodb.net service = 0 0 1026 pl-0-us-east-1.k45tj.mongodb.net.
         _mongodb._tcp.cluster0-pl-0.k45tj.mongodb.net service = 0 0 1024 pl-0-us-east-1.k45tj.mongodb.net.
         _mongodb._tcp.cluster0-pl-0.k45tj.mongodb.net service = 0 0 1025 pl-0-us-east-1.k45tj.mongodb.net.

      In the preceding example:

      - ``_mongodb._tcp.cluster0-pl-0.k45tj.mongodb.net`` is the SRV
        record that the
        ``mongodb+srv://cluster0-pl-0.k45tj.mongodb.net``
        connection string references.

      - ``pl-0-us-east-1.k45tj.mongodb.net`` is the hostname for each
        node in one |service| {+cluster+} in one region for which 
        you have configured {+aws-pl+}.

      - ``1024``, ``1025``, and ``1026`` are unique ports that 
        |service| assigns on the load balancer for each |service| 
        replica set node in the region for which you enabled 
        {+aws-pl+}. All nodes in an |service| replica set are 
        accessible via the same hostname, with the load balancer 
        resolving individual nodes by their unique port.

      **Hostname DNS Resolution in Private Endpoint-Aware Connection 
      Strings and SRV Records**

      The hostname in the SRV record and the standard connection string 
      is a |dns| Canonical Name (``CNAME``) record that resolves to the
      endpoint-specific regional |dns| name that |aws| generates for the
      interface endpoint. A |dns| ``ALIAS`` record exists for each 
      subnet in your |vpc| that you deployed the interface endpoint to. 
      Each ``ALIAS`` record contains the private IP address of the 
      :term:`interface endpoint` for that subnet.

      The following example shows the |dns| lookup for the hostname in 
      the SRV record and in the standard connection string, including 
      the endpoint-specific regional |dns| name for the interface 
      endpoint and its |dns| ``ALIAS`` records:

      .. code-block:: sh
         :copyable: false

         $ nslookup pl-0-us-east-1.k45tj.mongodb.net
         Server: 127.0.0.53
         Address: 127.0.0.53#53

         Non-authoritative answer:
         pl-0-us-east-1.k45tj.mongodb.net
         canonical name = vpce-024f5b57108c8d3ed-ypwbxwll.vpce-svc-02863655456245e5c.us-east-1.vpce.amazonaws.com.
    
         Name: vpce-024f5b57108c8d3ed-ypwbxwll.vpce-svc-02863655456245e5c.us-east-1.vpce.amazonaws.com
         Address: 10.0.30.194
         Name: vpce-024f5b57108c8d3ed-ypwbxwll.vpce-svc-02863655456245e5c.us-east-1.vpce.amazonaws.com
         Address: 10.0.20.54

   .. tab:: {+Serverless-Instances+}
      :tabid: serverless-instances

      When you configure a private endpoint, |service| generates DNS
      seedlist connection strings:

      DNS seedlist connection

      .. code-block:: none
         :copyable: false

         mongodb+srv://serverlessinstance0-pl-0.k45tj.mongodb.net

      .. include:: /includes/fact-pl-connection-strings.rst

      .. include:: /includes/fact-pl-serverless-srv-record-aws.rst

      **Hostname DNS Resolution in Private Endpoint-Aware Connection 
      Strings and SRV Records**

      The hostname in the SRV record and the standard connection string 
      is a |dns| Canonical Name (``CNAME``) record that resolves to the
      endpoint-specific regional |dns| name that |aws| generates for the
      interface endpoint. A |dns| ``ALIAS`` record exists for each 
      subnet in your |vpc| that you deployed the interface endpoint to. 
      Each ``ALIAS`` record contains the private IP address of the 
      :term:`interface endpoint` for that subnet.