Before you install |onprem|, you must:

- Decide how to configure |onprem| by going through the
  :doc:`/core/installation-checklist`.

- Deploy servers for the entire |onprem| deployment. The servers must meet
  the :doc:`/core/requirements`.

  .. warning::

     Failure to configure servers according to the
     :doc:`/core/requirements`, including the requirement to read the
     :manual:`MongoDB Production Notes
     </administration/production-notes>`, can lead to production failure.

- Deploy the |application| Database and optional Backup Database. The
  databases require dedicated MongoDB instances. Do **not** use MongoDB
  installations that store other data. The Backup Database is required
  only if you run the Backup Daemon and store snapshots and oplog entries
  through |onprem|. To deploy the databases, see
  :doc:`/tutorial/prepare-backing-mongodb-instances`.
