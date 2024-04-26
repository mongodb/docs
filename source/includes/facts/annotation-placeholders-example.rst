.. example::

   The following example specifies the ``{resourceName}``,
   ``{podIndex}``, and ``{namespace}`` placeholders:

   .. code-block:: yaml

      apiVersion: mongodb.com/v1
      kind: MongoDB
      metadata:
        name: mdb-rs
        namespace: ns
      spec:
        replicas: 3
        externalAccess:
          externalService:
            annotations:
              external-dns.alpha.kubernetes.io/hostname: {resourceName}-{podIndex}-{namespace}.example.com

   The |k8s-op-short| automatically populates the annotations 
   for the external services based on the proper value for each placeholder. 
   For example:

   .. code-block:: yaml

      mdb-rs-0-svc-external:
        annotations:
          external-dns.alpha.kubernetes.io/hostname: mdb-rs-0-ns.example.com
      mdb-rs-1-svc-external:
        annotations:
          external-dns.alpha.kubernetes.io/hostname: mdb-rs-1-ns.example.com
      mdb-rs-2-svc-external:
        annotations:
          external-dns.alpha.kubernetes.io/hostname: mdb-rs-2-ns.example.com
