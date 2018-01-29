Monitoring Agent
++++++++++++++++

Your deployment must have a running :term:`Monitoring Agent`. To install the
Monitoring Agent, see :doc:`/tutorial/nav/monitoring-agent`.

Backup Agent Host
+++++++++++++++++

Run the Backup Agent on a host that:

- Is separate from your MongoDB instances. This avoids system resource contention.

- Can connect to your MongoDB instances. Check network settings for
  connections between the agent and MongoDB hosts. For a list of needed ports,
  see :doc:`open ports for agents </reference/firewall-configuration>`.

- Has at least 2 CPU cores and 3 GB of RAM above platform requirements. With each
  backup job it runs, the Backup Agent further impacts host performance.
