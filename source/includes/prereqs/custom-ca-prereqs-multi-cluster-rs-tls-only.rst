- To enable internal cluster authentication, create |tls| certificates for
  member clusters in the |multi-cluster|. 

  .. tabs::

     .. tab:: With Service Mesh
        :tabid: with-sm

        Use one of the following options:

        - Generate a wildcard |tls| certificate that covers hostnames
          of the services that the |k8s-op-short| creates for each Pod
          in the deployment.

          If you generate wildcard certificates, you can continue using
          the same certificates when you scale up or rebalance nodes in
          the |k8s| member clusters, for example for :ref:`disaster recovery <disaster-recovery-ref>`.

          For example, add the hostname similar to the following format
          to the |san-dns|:

          .. code-block:: sh

             *.<namespace>.svc.cluster.local

        - For each |k8s| service that the |k8s-op-short| generates corresponding
          to each Pod in each member cluster, add |san-dns|\s to the certificate.
          In your |tls| certificate, the |san-dns| for each |k8s| service must
          use the following format:

          .. include:: /includes/prereqs/san-format-multi-cluster.rst

     .. tab:: Without Service Mesh
        :tabid: without-sm

        Use one of the following options:

        - Generate a wildcard |tls| certificate that contains all
          :ref:`externalDomains <multi-spec-clusterspeclist-externaldomain>`
          that you created in the |san-dns|. For example, add the hostnames
          similar to the following format to the |san-dns|:

          .. code-block:: sh
         
             *.cluster-0.example.com, *.cluster-1.example.com

          If you generate wildcard certificates, you can continue using
          them when you scale up or rebalance nodes in the |k8s| member
          clusters, for example for :ref:`disaster recovery <disaster-recovery-ref>`.

        - Generate a |tls| certificate for each MongoDB replica set member
          hostname in the |san-dns|. For example, add the hostnames similar
          to the following to the |san-dns|:

          .. code-block:: sh
    
             my-replica-set-0-0.cluster-0.example.com,
             my-replica-set-0-1.cluster-0.example.com, 
             my-replica-set-1-0.cluster-1.example.com,
             my-replica-set-1-1.cluster-1.example.com

          If you generate an individual |tls| certificate that contains
          all the specific hostnames, you must create a new certificate
          each time you scale up or rebalance nodes in the |k8s| member
          clusters, for example for :ref:`disaster recovery <disaster-recovery-ref>`.

- Generate one TLS certificate for your project's MongoDB Agents.

  .. include:: /includes/prereqs/mdbagent-reqs-multi-cluster.rst

- You must possess the |certauth| certificate and the key that you used to
  sign your |tls| certificates.

.. include:: /includes/prereqs/pem-format.rst
