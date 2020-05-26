.. list-table::
   :widths: 15 10 75
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``PUBLIC-KEY``
     - string
     - Your public API Key for your |api| credentials.

   * - ``PRIVATE-KEY``
     - string
     - Your :ref:`private API Key <mms-prog-api-key>` for your |api|
       credentials.

   * -
       .. cond:: cloud

          ``{+cloudmgr-url+}``

       .. cond:: onprem

          ``{+opsmgr-url+}``
     - string
     - |url| of your |mms| instance.

   * - ``GROUP-ID``
     - string
     - Unique identifier of your project that contains the source
       cluster for the restore job. You can find this value in the
       :ref:`Project Settings <manage-group-settings>` of that
       project.

   * - ``CLUSTER-ID``
     - string
     - Unique identifier of your source cluster for the restore job.

   * - ``TARGET-GROUP-ID``
     - string
     - Unique identifier of your project that contains the target
       cluster for the restore job.

   * - ``TARGET-CLUSTER-ID``
     - string
     - Unique identifier of your target cluster for the restore job.

   * - ``SNAPSHOT-ID``
     - string
     - Unique identifier of the snapshot you want to restore.
