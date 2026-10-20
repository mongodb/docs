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

The Orchestration Engine also limits the number of concurrent requests
that it can serve. As a result, a project might not be able to run 512
agents at the same time. To learn about this limit, see
:ref:`agentic-platform-limitations-oe-capacity`.

If you have capacity issues, choose one of the following options:

.. list-table::
   :header-rows: 1
   :widths: 30 35 35

   * - Option
     - Effect
     - Tradeoff

   * - Increase the ``scaling.replicas`` value.
     - Serves more sessions at the same time.
     - Increases your Atlas costs.

   * - Reduce the ``scaling.agent_idle_ttl_seconds`` and
       ``scaling.tool_idle_ttl_seconds`` values.
     - Allows idle sessions to release their sandboxes sooner.
     - When an idle session becomes active again after its tool
       sandbox is released, it uses a new tool sandbox.

   * - Reuse a session ID across requests.
     - Requests that share a session ID reuse one reservation. Requests
       that omit a session ID use a new pair of sandboxes.
     - Requests that share a session ID also share the same session
       state. Do not reuse a session ID if your workload requires
       isolation.

   * - Call ``app.finish_session()`` in your agent code.
     - Releases the session's sandboxes when the current turn
       completes, instead of waiting for an idle timeout to expire.
     - Requires a change to your agent code. A turn that suspends or
       fails keeps its sandboxes until the idle timeout expires. To
       learn more, see
       :ref:`agentic-platform-invoke-agent-finish-session`.

A session ID must be 1 to 128 characters long and can contain letters,
numbers, underscores (``_``), and hyphens (``-``). Pass the session ID
in the ``--session`` option of the ``agentengine invoke`` command, or in
the ``X-Session-ID`` header of an API request.