If you have an |onprem| 4.2 installation with more than one |onprem|
host pointing to the same Application Database, you can upgrade
|onprem| to a newer 4.2 version without incurring monitoring downtime.
During this upgrade, |onprem| enters a state known as **Upgrade Mode**:
a state in which |onprem| is available during an upgrade. The benefits
of this mode are that throughout the upgrade process:

- Alerts and monitoring operate
- |onprem| instances remain live
- |application| may be accessed in read-only mode
- |onprem| |api|\s that write or delete data are disabled

Your |onprem| instance stays in **Upgrade Mode** until all |onprem|
hosts have been upgraded and restarted.

.. note::

   - **Upgrade Mode** works with |onprem| 4.2 and later only.
   - You need to stop all Backup Daemons before upgrading to later
     versions of 4.2.x.
