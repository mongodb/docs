Collection Interval
+++++++++++++++++++

If you are updating the agent, keep in mind that when the Monitoring Agent
restarts, there is a five-minute delay before that agent begins collecting
data and sending pings to |monitoring|. If you have multiple agents, this
delay permits other agents in your infrastructure to become the primary
agent and permits |monitoring| to determine which agent will be primary.

During this interval, the restarted Monitoring Agent will not
collect data.
