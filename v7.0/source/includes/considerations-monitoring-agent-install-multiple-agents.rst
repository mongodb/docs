You can :ref:`activate Monitoring <activate-monitoring>`
on multiple {+mdbagent+}s to distribute monitoring assignments and
provide failover. |mms| distributes monitoring assignments among up
to 100 running {+mdbagent+}s. Each {+mdbagent+} running active
Monitoring monitors a different set of MongoDB processes. One
{+mdbagent+} running active Monitoring per project is the primary
Monitor. The primary Monitor reports the cluster's status to |mms|.
As {+mdbagent+}s have Monitoring enabled or disabled, |mms|
redistributes assignments. If the primary Monitor fails, |mms|
assigns another {+mdbagent+} running active Monitoring to be the
primary Monitor.

If you run more than 100 {+mdbagent+}s with active Monitoring, the
additional {+mdbagent+}s run as standby {+mdbagent+}s. A standby
{+mdbagent+} is idle, except to log its status as a standby and
periodically ask |mms| if it should begin monitoring.

To tune the frequency at which standby {+mdbagent+}s check to see
if they should begin monitoring and the interval |mms| uses to
determine if a standby agent should start monitoring, see
:ref:`standby-monitoring-agent`.

If you install multiple Monitoring Agents, ensure that *all* the
{+mdbagent+}s with active Monitoring can reach all the |mongod|
processes in the deployment.

To activate Monitoring on multiple {+mdbagent+}s, repeat the
:ref:`activation process <activate-monitoring>` on multiple
{+mdbagent+}s.
