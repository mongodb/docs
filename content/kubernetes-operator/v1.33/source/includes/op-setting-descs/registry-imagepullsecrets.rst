|k8s-secret| that contains the credentials required to pull
images from the repository.

.. important::

   OpenShift requires this setting. Define it in the
   ``imagePullSecrets`` setting in this file or pass it when you install
   the |k8s-op-short| using Helm.
   If you use the |k8s-op-short| to deploy MongoDB resources to
   :ref:`multiple namespaces <ns-scope-different-ns>` or with a
   :ref:`cluster-wide scope <cluster-wide-scope>`, create the secret
   only in the namespace where you installed the |k8s-op-short|.
   The |k8s-op-short| synchronizes the secret across all watched
   namespaces.
