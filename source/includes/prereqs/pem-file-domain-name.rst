Each certificate should include a valid Domain Name.

For each replica set or sharded cluster member, the Common Name, also
known as the Domain Name, for that member's certificate must match
the |fqdn| of the pod this cluster member is deployed on.

The |fqdn| name in each certificate has the following syntax:
``pod-name.service-name.namespace.svc.cluster.local``. This name is
different for each Pod hosting a member of the replica set or a
sharded cluster.

For example, for a member of a replica set deployed on a Pod with
the name ``rs-mongos-0-0``, in the |k8s-op-short| service
named ``mongo-0`` that is created in the default ``mongodb``
namespace, the |fqdn| is:

.. code-block:: sh

   rs-mongos-0-0.mongo-0.mongodb.svc.cluster.local