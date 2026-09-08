.. procedure::
   :style: normal

   .. step:: Verify the service outage.

      When you notice symptoms of a service outage, review your
      preferred status report to verify the event. You can view this
      information on the `MongoDB Cloud Status
      <https://status.mongodb.com/>`__ page or your cloud provider's
      status page. You can configure :ref:`{+atlas-sp+} Alerts
      <atlas-sp-alerts>`. Note the timestamp of the failure event.

   .. step:: Start failover processors.

      Follow the procedure described in :ref:`Initiate Failover for
      One Stream Processor <atlas-sp-manage-processor-failover>`. To
      ensure service resumes from the last consumed stream event, pass
      the timestamp you noted previously as the
      ``startAtOperationTime`` parameter.

      Processors using {+kafka+} sources resume according to consumer
      group offsets.

   .. step:: (Optional) Automate primary processor suppression.

      When your primary region comes back online, your primary
      processors will restart automatically, resulting in duplicate
      processing. Create and run a script to continuously check the
      status of the primary region and stop all processors in that
      region when it comes back online.

   .. step:: Verify that the service resumes.

      After completing failover, periodically check the status of your
      workspace's primary region. You can view this information on the
      `MongoDB Cloud Status <https://status.mongodb.com/>`__ page or
      your cloud provider's status page. You can also configure
      :ref:`{+atlas-sp+} Alerts <atlas-sp-alerts>`. If you use
      automatic primary processor suppression, you can configure the
      script to return notifications when it detects primary processors
      automatically restarting.

   .. step:: Initiate failback.

      Stop your failover stream processors. Note the timestamp for
      each stoppage.

   .. step:: Restart primary processors.

      Restart the stream processors in your primary region. To ensure
      service resumes from the last consumed stream event, pass the
      timestamp you noted previously as the ``startAtOperationTime``
      parameter.

      Processors using {+kafka+} sources resume according to consumer
      group offsets.
      
