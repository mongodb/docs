If you have a highly available installation on |onprem|, you can take
advantage of **Upgrade Mode**: a state in which |onprem| is available
during an upgrade. The benefits of this mode are that  throughout the
upgrade process:

- Alerts and monitoring operate
- |onprem| instances remain live
- |application| may be accessed in read-only mode
- |onprem| |api|\s that write or delete data are disabled

Your |onprem| instance stays in **Upgrade Mode** until all |onprem|
hosts have been upgraded and restarted.
