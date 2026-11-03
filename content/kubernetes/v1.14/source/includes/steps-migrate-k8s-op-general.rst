.. step:: Upgrade to v1.33 of the MongoDB Enterprise Kubernetes Operator.

          Upgrade your MongoDB Enterprise Kubernetes Operator deployment 
          to v1.33 before you migrate. The upgrade process requires that 
          you upgrade incrementally through each minor version. For 
          example, if you are upgrading from version 1.31.x, you must 
          first upgrade to 1.32.x before proceeding to 1.33.x.

.. step:: Scale down the MongoDB Enterprise Kubernetes Operator to 0 replicas.

          This prevents both MongoDB Enterprise Kubernetes Operator and |k8s-op-full| from running in parallel.