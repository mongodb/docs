{+service+} automatically notifies you when log exports fail or recover through
:ref:`default alerts <default-alert-settings>` that are enabled for all projects.

Default Alerts
~~~~~~~~~~~~~~

The following alerts are enabled by default for all projects with External Log Sinks:

- :alert:`Log export has failed. Check your integration settings and credentials.`
- :alert:`Log export is failing after multiple attempts. Logs are being queued and will be sent once the connection is restored.`
- :alert:`Log export replay has failed to deliver records to an external platform, even after an automatic replay attempt. These records will be permanently deleted once their retention window expires. Contact MongoDB Support to request redelivery.`

All alerts send email notifications to all users with the
:authrole:`Project Owner` role and appear in the :guilabel:`Project
Activity Feed`. You can customize the notification recipients and
methods in the :guilabel:`Project Alerts` settings.

Activity Feed Events
~~~~~~~~~~~~~~~~~~~~

In addition to alerts, {+service+} logs the following informational
events to the :guilabel:`Project Activity Feed`:

- :guilabel:`Log export has recovered. Queued logs are ready to resume sending.`
- :guilabel:`Log export has recovered. Queued logs are now being sent.`
- :guilabel:`All queued logs have been delivered to sink.`

To view these events, see :ref:`activity-feed`.

For more information about configuring alert notifications, see
:ref:`configure-alert-settings`.