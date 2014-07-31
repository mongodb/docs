Monitoring Agent Redundancy
+++++++++++++++++++++++++++

Only one Monitoring Agent per group or environment will report to |monitoring|
at a time. If your Monitoring Agent can connect to all hosts in your
deployment, a single Monitoring Agent is sufficient and strongly
recommended.  Multiple agents can cause unexpected problems.

However, you can run a second instance of the agent to provide
redundancy as a hot standby. To install secondary agents, simply
repeat the installation process.
