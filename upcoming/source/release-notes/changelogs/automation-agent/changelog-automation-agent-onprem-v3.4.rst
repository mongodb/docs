.. _automation-3.2.18.4938-1:

Automation Agent 3.2.18.4938-1
------------------------------

:ref:`Released with Ops Manager 3.4.14 on 2018-05-03 <opsmgr-server-3.4.14>`

.. _automation-3.2.17.4936:

Automation Agent 3.2.17.4936
----------------------------

:ref:`Released with Ops Manager 3.4.13 on 2018-04-05 <opsmgr-server-3.4.13>`

- **Fix:** Automation Agent determination of Goal State was incorrect
  for multi-server deployments using the ldap.bind.queryPassword
  parameter. This is now resolved and rolling changes will proceed
  correctly on these deployments.
     
.. _automation-3.2.16.2444:

Automation Agent 3.2.16.2444
------------------------------

:ref:`Released with Ops Manager 3.4.12 on 2018-02-01 <opsmgr-server-3.4.12>`

- Logging enhancements

.. _automation-3.2.16.2263:

Automation Agent 3.2.16.2263
------------------------------

:ref:`Released with Ops Manager 3.4.10 on 2017-11-02 <opsmgr-server-3.4.10>`

.. _automation-3.2.15.2257:

Automation Agent 3.2.15.2257
------------------------------

:ref:`Released with Ops Manager 3.4.9 on 2017-10-05 <opsmgr-server-3.4.9>`

- Fix failure to collect disk-related hardware statistics on some
  hardware configurations.

- When Automation creates a temporary Windows service in order to
  perform maintenance operations on a ``mongod``, remove the service
  when the maintenance is completed.

.. _automation-3.2.14.2187:

Automation Agent 3.2.14.2187
------------------------------

:ref:`Released with Ops Manager 3.4.7 on 2017-08-03 <opsmgr-server-3.4.7>`

- Optimization to reduce the number of checks to see if a process is
  running.

- Improve state detection during conversions to config server
  replica sets.

.. _automation-3.2.13.2141:

Automation Agent 3.2.13.2141
------------------------------

:ref:`Released with Ops Manager 3.4.6 on 2017-07-06 <opsmgr-server-3.4.6>`

- **Fix:** During CSRS conversion, use differently named log files for
  temporary config servers.

- **Fix:** During CSRS conversion, only shut down a member when it is
  in secondary state.

- **Fix:** Config file parsing code on Windows did not parse all
  possible options.

.. _automation-3.2.12.2107:

Automation Agent 3.2.12.2107
----------------------------

:ref:`Released with Ops Manager 3.4.5 on 2017-05-18 <opsmgr-server-3.4.5>`

- When performing an automated restore to a sharded cluster with
  different shard names, update the shard identity document.

- When performing an automated restore, ensure that shard metadata
  is always updated in the right order.

- When performing an automated restore, always restore to the default 
  protocol version.

- **Fix:** RHEL7 packaging so that Automation Agent starts on server 
  boot.

- Reduce frequency at which Automation Agent checks managed log files 
  to reduce CPU overhead.

- Ignore get_mempolicy errors and assume numa not enabled.

.. _automation-3.2.11.2025:

Automation Agent 3.2.11.2025
----------------------------

:ref:`Released with Ops Manager 3.4.4 on 2017-03-30 <opsmgr-server-3.4.4>`

- Fix problem with shutdown of ``mongod`` processes during an automated
  restores on Windows.

- Fix for issues using Automation in multi-server deployments using
  SSL and encrypted PEM key files.

- Optimization for goal state maintenance of sharded clusters.
  Automation Agents will execute far fewer commands in steady state.

.. _automation-3.2.10.1997:

Automation Agent 3.2.10.1997
----------------------------

:ref:`Released with Ops Manager 3.4.3 on 2017-02-17 <opsmgr-server-3.4.3>`

- Fix bug in removal of shards for sharded clusters on MongoDB 3.4.

- Built with Go 1.7.

- Support for MacOS Sierra.

.. _automation-3.2.9.1985:

Automation Agent 3.2.9.1985
---------------------------

:ref:`Released with Ops Manager 3.4.2 on 2017-01-19 <opsmgr-server-3.4.2>`

- **Fix:** Can install Agent on Windows if the Windows Firewall was 
  disabled.

- **Fix:** Can use MONGODB-CR for Agent authentication when LDAP
  was being used for User authentication.

- **Fix:** Issue where Agent would stop sending status after MongoDB
  reaches its connection limit.

.. _automation-3.2.8.1942:

Automation Agent 3.2.8.1942
---------------------------

:ref:`Released with Ops Manager 3.4.1 on 2016-12-27 <opsmgr-server-3.4.1>`

- **Fix:** Can install MongoDB on Power Linux when using Ops Manager in
  'Local Mode'.

.. _automation-3.2.7.1927:

Automation Agent 3.2.7.1927
---------------------------

*Released with OpsManager 3.4.0 on 2016-11-29*

- Adds support for automation of MongoDB 3.4 deployments.

- Adds support for management of Monitoring/Backup Agents on
  PowerPC-based Linux systems for MongoDB 3.4 or later deployments
  only.

- Built using Go 1.6.

- Adds support for gathering of hardware metrics.

- When importing a process that uses a password for the PEMKeyFile,
  no longer requires user to re-enter the PEMKeyFile password.

- **Fix:** Can upgrade from MongoDB 2.4 to 2.6 while staying
  on authSchemaVersion 1.

- Does not create Windows firewall rules for processes that are
  started on temporary ports where external access is not required.

- Uses ``systemd`` management on RHEL7 and Ubuntu 16.04.
