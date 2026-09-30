If you create custom services that require external access to MongoDB custom
resources deployed by the |k8s-op-short| and use readiness probes
in |k8s|, set the ``publishNotReadyAddresses`` setting in |k8s| to ``true``.

The ``publishNotReadyAddresses`` setting indicates that an agent that
interacts with endpoints for this service should disregard the service's
:k8sdocs:`ready </concepts/services-networking/endpoint-slices/#ready>`
state. Setting ``publishNotReadyAddresses`` to ``true`` overrides the
behavior of the readiness probe configured for the Pod hosting your service.

By default, the ``publishNotReadyAddresses`` setting is set to ``false``.
In this case, when the Pods that host the MongoDB custom resources in the
|k8s-op-short| lose connectivity to |cloud-short| or |onprem|, the
readiness probes configured for these Pods fail.
However, when you set the  ``publishNotReadyAddresses`` setting to ``true``:

- |k8s| does not shut down the service whose readiness probe fails.
- |k8s| considers all endpoints as :k8sdocs:`ready </concepts/services-networking/endpoint-slices/#ready>`
  even if the probes for the Pods hosting the services for these endpoints
  indicate that they aren't ready.
- MongoDB custom resources are still available for read and write operations.

.. seealso::
   
   - |k8s-api-ref| and search for ``publishNotReadyAddresses``
   - :k8sdocs:`DNS for Services in Pods </concepts/services-networking/dns-pod-service/>`
   - :k8sdocs:`Configure Readiness Probes </tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes>`
