.. note:: Data Source Requirements for Device Sync

   To enable Device Sync, your App Services App must have at least one linked
   data source that meets the following requirements:

   - A non-sharded MongoDB Atlas cluster running
     :manual:`MongoDB {+sync-min-mongo-version-required+} or later </release-notes/>`.
   - Cluster *cannot* be a serverless instance or {+adf-instance+}. Refer to
     :ref:`<data-source-limitations>`.
