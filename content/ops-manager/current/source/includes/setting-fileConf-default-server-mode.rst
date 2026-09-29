.. setting:: mms.mongoDbUsage.defaultUsageType

   *Type*: string

   *Default*: ``PRODUCTION_SERVER``

   Default MongoDB Enterprise server type for all Enterprise
   processes that this |onprem| instance manages.

   In the configuration file, set this parameter to one of the
   following values:

   - ``PRODUCTION_SERVER``
   - ``TEST_SERVER``
   - ``DEV_SERVER``
   - ``RAM_POOL``
   - ``RAM_POOL_TEST``
   - ``BACKING_DATABASE``

   |onprem| uses this value only when the host, its project, and its
   organization don't specify a server type. To set the server type
   for a specific host, use the :ref:`mongodb-usage-page`. |onprem|
   bases usage reporting on each host's own server type.

   The following table describes the environment purpose and license
   requirement for each server type. The table uses the server type
   labels that appear in the |onprem| UI, not the configuration file
   values listed above:

   .. include:: /includes/list-table-server-types.rst

   Corresponds to :setting:`Default Ops Manager MongoDB Server Type`.
   

