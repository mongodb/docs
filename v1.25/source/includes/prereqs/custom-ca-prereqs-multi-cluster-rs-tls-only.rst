
.. note::

   You must possess the |certauth| certificate and the key that you used to
   sign your |tls| certificates.

.. tabs::

   .. tab:: With Service Mesh
      :tabid: with-sm

      .. include:: /includes/steps/add-tls-service-mesh.rst

   .. tab:: With Service Mesh (via script)
      :tabid: via-script

      To speed up creating |tls| certificates for member |k8s| clusters,
      we offer the :github:`setup_tls script </mongodb/mongodb-enterprise-kubernetes/blob/master/tools/multicluster/setup_tls.sh>`. We don't guarantee the script's maintenance. If you choose to use the script,
      test it and adjust it to your needs. The script does the following:

      - Creates the ``cert-manager`` namespace in the connected cluster and installs `cert-manager <https://cert-manager.io/docs/>`__ using |helm| in the ``cert-manager`` namespace.

      - Installs a local |certauth| using `mkcert <https://github.com/FiloSottile/mkcert>`__.

      - Downloads |tls| certificates from ``downloads.mongodb.com`` and concatenates them with the |certauth| file name and ``ca-chain``.

      - Creates a ConfigMap that includes the ``ca-chain`` files.

      - Creates an ``Issuer`` resource, which cert-manager uses to generate certificates.

      - Creates a ``Certificate`` resource, which cert-manager uses to create a key object for the certificates.

      To use the script:

      .. include:: /includes/steps/add-tls-script.rst

   .. tab:: Without Service Mesh
      :tabid: without-sm

      .. include:: /includes/steps/add-tls-without-service-mesh.rst
