.. setting:: Versions Directory

   *Type*: string

   *Default*:  ``/opt/mongodb/mms/mongodb-releases/``

   
   Specify the directory on the |application| server where |onprem|
   stores the MongoDB binaries. The {+aagent+} accesses the
   binaries when installing or changing versions of MongoDB on your
   deployments. If you set ``Version Manifest Source`` to run in
   ``Local`` mode, the Backup Daemons also access the MongoDB binaries
   from this directory. See :doc:`/tutorial/configure-local-mode` for
   more information.
   
   Corresponds to :setting:`automation.versions.directory`.
   

