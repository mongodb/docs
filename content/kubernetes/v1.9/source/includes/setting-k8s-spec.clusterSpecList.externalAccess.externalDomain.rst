.. _multi-spec-clusterspeclist-externaldomain:

``spec.clusterSpecList.externalAccess.externalDomain``
  *Type*: string

  .. |hostname-format| replace:: ``<replica-set-name>-<cluster-idx>-<pod-idx>.<externalDomain>``

  .. |hostname-example| replace:: ``multi-replica-set-0-1.cluster-0.example.com``

  .. include:: /includes/facts/fact-external-domain-spec.rst

  .. important::

     Use this setting only when deploying a |multi-cluster| replica set *without
     a service mesh*. See :ref:`multi-cluster-no-service-mesh-deploy-rs`.