Before upgrading |onprem| from 4.4 to 5.0, review the following
considerations:

Backing Databases
~~~~~~~~~~~~~~~~~

|onprem| 5.0.0 requires a minimum of MongoDB 4.2.0 for |onprem| backing
databases.

Personal API Keys
~~~~~~~~~~~~~~~~~

|onprem| 5.0 removes the use of Personal |api| Keys.

Platform Support Changes
~~~~~~~~~~~~~~~~~~~~~~~~

|onprem| 5.0 and later make the following changes to supported platforms:

- Removes support of the Windows platform.

- Maintains support for managing MongoDB deployments that run
  on Windows 2016, 2019, 2020.

- Removes support for managing MongoDB deployments with the MongoDB Agent
  that runs on Ubuntu 16.x on the PowerPC (``ppc64le``) architecture.

To learn more about supported platforms for running |onprem| on,
see :ref:`Ops Manager Software Requirements <software-requirements>`.

Rapid Release Versions
~~~~~~~~~~~~~~~~~~~~~~

Rapid Release versions will not be released for |onprem| 5.0 and later.

Security Remediation
~~~~~~~~~~~~~~~~~~~~

|onprem| upgraded all third party dependencies to recent versions. This
addresses existing security vulnerabilities.

Snapshots during Resharding
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You may not be able to restore a |onprem| snapshot taken during a
resharding operation of a MongoDB 5.0 sharded cluster. A subsequent
|onprem| 5.0.x release will remove this limitation.


