Monitoring Agent Redundancy
+++++++++++++++++++++++++++

Only one Monitoring agent per group or environment will report to |monitoring|
at a time. If your monitoring agent can connect to all hosts in your
deployment, a single monitoring agent is sufficient and strongly
recommended.  Multiple agents can cause unexpected problems.

However, you can run a second instance of the agent to provide
redundancy as a hot standby. To install secondary agents, simply
repeat the installation process.
