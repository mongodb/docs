The {+platform-short+} does not autoscale agent deployments. The
``scaling.replicas`` field in the ``agent.yaml`` file sets a fixed
sandbox count, and each session reserves one agent sandbox and one
tool sandbox for its lifetime. As a result, this field sets the number
of sessions that a deployment can serve concurrently.

The ``scaling.replicas`` field accepts a value from 1 to 512 and
defaults to 4 when you omit it. When every sandbox is reserved, a new
invoke request fails with a ``pool full`` error.

The 512 concurrent sandbox limit applies to the Orchestration Engine,
which is scoped to a project and can serve more than one agent. The
``scaling.replicas`` values of all agents in a project count toward
the same ceiling. To run more sandboxes than one project allows,
distribute your agents across multiple projects.

To keep invoke requests from exhausting the pool, reuse session IDs
across requests. Requests that share a session ID reuse one reservation,
but requests that omit a session ID use a new pair of sandboxes. A
session ID must be 1 to 128 characters long and can contain letters,
numbers, underscores (``_``), and hyphens (``-``). Pass the session ID
in the ``--session`` option of the ``agentengine invoke`` command, or in
the ``X-Session-ID`` header of an API request.

If your invoke requests require per-session isolation, you can't
reuse a session ID. To serve more sessions at the same time, increase
the ``scaling.replicas`` value, or reduce the
``scaling.agent_idle_ttl_seconds`` and ``scaling.tool_idle_ttl_seconds``
values so that idle sessions release their sandboxes sooner.
