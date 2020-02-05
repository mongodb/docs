To install the MongoDB |k8s-op-short|, you must:

1. Have a |k8s| solution available to use.

   If you need a |k8s| solution, see the |k8s|
   :k8sdocs:`documentation on picking the right solution </setup>`.

#. Have a running |onprem-link|.

   .. important::

      Your |onprem| installation must run an active |ntp| service. If
      the |onprem| host's clock falls out of sync, that host can't
      communicate with the |k8s-op-short|.

      To learn how to check your |ntp| service for your Ops Manager
      host, see the documentation for
      `Ubuntu <https://help.ubuntu.com/lts/serverguide/NTP.html>`__ or
      `RHEL <https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/s1-checking_the_status_of_ntp>`__.


#. Clone the :gh:`MongoDB Enterprise Kubernetes Operator repository </mongodb/mongodb-enterprise-kubernetes>`.

   .. code-block:: sh

      git clone https://github.com/mongodb/mongodb-enterprise-kubernetes.git

   .. note::

      You can use `Helm <https://helm.sh/>`__ to install the
      |k8s-op-short|. To learn how to install Helm, see its
      :gh:`documentation on GitHub </kubernetes/helm>`.

#. Create a |k8s-ns| for your |k8s| deployment. By default, The
   |k8s-op-short| uses the ``mongodb`` namespace. To simplify your
   installation, consider creating a namespace labeled ``mongodb``
   using the following |kubectl| command:

   .. code-block:: sh

      kubectl create namespace mongodb

   If you do not want to use the ``mongodb`` namespace, you can label
   your namespace anything you like:

   .. code-block:: sh

      kubectl create namespace <namespaceName>