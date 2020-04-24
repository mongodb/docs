- :doc:`Install the Kubernetes Operator </tutorial/install-k8s-operator>`

- :doc:`Create Credentials for the Kubernetes Operator </tutorial/create-operator-credentials>`

- :ref:`Deploy the Ops Manager application <deploy-om-container>` that
  you want to secure

- Create a |tls| certificate for each member of the Application
  Database's :term:`replica set`.

  These |tls| certificates require two attributes:

  .. list-table::
     :widths: 15 85
     :stub-columns: 1

     * - DNS Names
       - Each certificate should include a |san-dns| or Subject Name
         with the name of the |k8s-pod| in |k8s|. These names should
         resemble this format:

         .. code-block:: sh

            <ops-manager-name>db<index>.<ops-manager-name>-db-svc.<namespace>.svc.cluster.local

     * - Key Usages
       - MongoDB requires the |tls| certs to include two specific
         key-usages (:rfc:`5280#section-4.2.1.3`):

         - "server auth"
         - "client auth"
