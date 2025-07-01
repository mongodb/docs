.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Field 
     - Value

   * - Deployment ID 
     - Unique identifier that references this deployment region in
       configurations. The ID can contain up to 64 alphanumeric
       characters and the dash (``-``), underscore (``_``), and dot
       (``.``) characters. 

       You can't modify the deployment ID of a region once it's created.  

   * - Ingestion Endpoint 
     - |onprem| instance to which the :opsmgr:`Backup Agent
       </reference/glossary/#std-term-backup-agent>` writes snapshot or
       oplog data. Value must be a valid |url| such as
       ``http://www.mongodb.com``. Supports both HTTP and HTTPS
       protocols. 

   * - Restore Endpoint 
     - |onprem| instance that serves restore requests.

   * - Queryable Proxy Server Endpoint 
     - |onprem| instance that serves :opsmgr:`Queryable Backup
       </reference/glossary/#std-term-queryable-backup>` requests. Value
       must be in the following format: ``domain:port``. For example,
       ``localhost:8080``.  

   * - Deployment Description
     - String that describes the purpose of the deployment region.

   * - Assignment Enabled
     - Flag that specifies whether you an assign the region to new
       resources. If you disable this field, you can't assign the region
       to any new resource. 