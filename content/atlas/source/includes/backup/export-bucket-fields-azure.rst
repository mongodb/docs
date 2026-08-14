.. list-table::
   :header-rows: 1
   :widths: 25 60 15

   * - Request Body Field
     - Value
     - Necessity

   * - ``cloudProvider``
     - ``AZURE``
     - Required

   * - ``bucketName``
     - Name of the {+az-bs+} Container that is authorized to receive
       |service| {+Cloud-Backup+} snapshots. To set up |service|
       access to this container, see the :ref:`Prerequisites
       <cloud-backup-export-prereqs-azure>` section.
     - Required

   * - ``roleId``
     - Unique 24-hexadecimal character string that identifies the
       |azure| Service Principal that |service| uses to
       access the {+az-bs+}.

       To learn more, see :ref:`manage-azure-access`.
     - Required

   * - ``serviceUrl``
     - Service endpoint of your {+az-bs+} account.

       To learn more,
       see the :azure:`Azure Documentation </storage/common/storage-account-get-info?tabs=azure-cli#get-service-endpoints-for-the-storage-account>`.
     - Required
