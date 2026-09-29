.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``assignmentEnabled``
     - boolean
     - Flag indicating whether you can assign :ref:`Deployment Regions
       <deployment-regions-interface>` to backup resources.

   * - ``bqProxyEndpoint``
     - string
     - |onprem| instance that serves :opsmgr:`Queryable Backup
       </reference/glossary/#std-term-queryable-backup>` requests. Value
       is in the following format: ``domain:port``. For example,
       ``localhost:8080``.  

   * - ``deploymentDescription``
     - string
     - String that describes the purpose of the deployment region.

   * - ``id``
     - string
     - Unique identifier that references this deployment region in
       configurations.  

   * - ``ingestionEndpoint``
     - string
     - |onprem| instance to which the :opsmgr:`Backup Agent
       </reference/glossary/#std-term-backup-agent>` writes snapshot or
       oplog data. Value is a valid |url| such as
       ``http://www.mongodb.com``. Supports both |http| and |https|.

   * - ``links``
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - ``restoreEndpoint``
     - string
     - |onprem| instance that serves restore requests.