- Complete the :ref:`Prerequisites <om-rsrc-prereqs>`.
- Read the :ref:`Considerations <om-rsrc-considerations>`.
- Create one |tls| certificate for the Application
  Database's :term:`replica set`.

  This |tls| certificate requires the following attributes:

  .. list-table::
     :widths: 15 85
     :stub-columns: 1

     * - DNS Names
       - Ensure that you add |san-dns|\s or Subject Names
         for each |k8s-pod| that hosts a member of the 
         Application Database replica set. The |san-dns| for each pod
         must use the following format:

         .. code-block:: sh

            <opsmgr-metadata.name>-db-<index>.<opsmgr-metadata.name>-db-svc.<namespace>.svc.cluster.local

     * - Key Usages
       - Ensure that the |tls| certificates include the following
         key-usages (:rfc:`5280 <5280#section-4.2.1.3>`):

         - "server auth"
         - "client auth"

.. include:: /includes/prereqs/pem-format.rst
