.. _install-k8s-operator-oc:

.. admonition:: Use the same namespace throughout
   :class: note

   The following examples assume that you created a |k8s-ns|
   using the default |k8s-op-short| namespace of ``mongodb``.
   If you specified a different label for your namespace when
   you :ref:`created it <k8s-prerequisites>`, change all
   values for ``metadata.namespace`` to that namespace.

   To change the label for the namespace for the following
   deployment to ``production``, edit all values for
   ``metadata.namespace`` in ``mongodb-enterprise-openshift.yaml``:

   .. code-block:: yaml
      :emphasize-lines: 8, 16

      ##---
      # Source: mongodb-enterprise-operator/templates/serviceaccount.yaml
      ---
      apiVersion: v1
      kind: ServiceAccount
      metadata:
        name: enterprise-operator
        namespace: production
      ##---
      # Source: mongodb-enterprise-operator/templates/operator.yaml
      ---
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: enterprise-operator
        namespace: production

      ---
      # Example truncated
      ---
      ...

1. Change to the directory in which you cloned the repository.

#. Install the |k8s-crds| for MongoDB deployments using the
   following |oc| command:

   .. code-block:: sh

      oc apply -f crds.yaml

#. You can edit the Operator |yaml| file to further customize
   your Operator before installing it.

   a. Open your ``mongodb-enterprise-openshift.yaml`` in your preferred
      text editor.
    
   #. You must add your ``<openshift-pull-secret>`` to the 
      ``ServiceAccount`` definitions:

      .. literalinclude:: /includes/openshift-service-accounts.yaml
         :language: yaml
         :emphasize-lines: 11-12, 22-23, 33-34

   #. You may need to add one or more of the following
      options:

      .. include:: /includes/list-tables/k8s-oc-install-options.rst

#. Install the |k8s-op-short| using the following
   |oc| command:

   .. code-block:: sh

      oc apply -f mongodb-enterprise-openshift.yaml

To troubleshoot your |k8s-op-short|, see :ref:`review-k8s-op-logs`.

.. include:: /includes/admonitions/fact-remove-k8s-resources-first.rst