You must have the :guilabel:`Administrator` access privileges (be the Administrator or belong to an Administrator group) on the servers on which you install |onprem|.

Before you install |onprem|, you must:

1. Plan your configuration, referring to the :doc:`/core/installation-checklist`.

2. Deploy servers that meet the :doc:`/core/requirements`.

   .. warning::

      Failure to configure servers according to the
      :doc:`/core/requirements`, including the requirement to read the
      :manual:`MongoDB Production Notes
      </administration/production-notes>`, can lead to production failure.

3. Set any firewall rules toallow access to the ports on which the MongoDB instances run. 

4. :doc:`Install the Ops Manager Application Database and optional Backup Database </tutorial/prepare-backing-mongodb-instances>`. The databases require dedicated MongoDB instances. Do **not** use MongoDB installations that store other data. The Backup Database is required only if you will use the Backup feature.

   .. note::

      |mms| cannot deploy its own backing databases. You must deploy those
      databases manually.

5. Test that the MongoDB instances that store the :ref:`mms-application-database` are running and that they can be reached from the |application|'s host server.

