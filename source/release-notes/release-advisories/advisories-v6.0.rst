Before upgrading |onprem| from 5.0 to 6.0, review the following considerations:

Backing Databases
~~~~~~~~~~~~~~~~~

|onprem| 6.0.0 requires a minimum of MongoDB 4.4.0 for |onprem| backing
databases.

|onprem| Platform Support
~~~~~~~~~~~~~~~~~~~~~~~~~

Adds support to run |onprem| on Debian 11.

Alerting
--------

- Deprecates |snmp| alerts. |onprem| 7.0.0 will not include |snmp|
  alerts.

Automation Platform Support
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Adds support for automating deployments on RedHat Enterprise Linux
  version 8 and Amazon Linux 2 on the ARM64/aarch64 architecture.

- Removes support for automating deployments on Debian 9 and RedHat
  Enterprise Linux 6.

Automation Support Changes
~~~~~~~~~~~~~~~~~~~~~~~~~~

Removes support for automating MongoDB 3.4 deployments.
