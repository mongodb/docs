Secret Access
~~~~~~~~~~~~~

Agents have access to all secrets in their project. New secrets are
added at the project level, not the workspace level, by default.
Agents that you deploy into an existing project can access every
secret in the project, including the ``MONGODB_URI`` that other
agents use.

To restrict a secret to one workspace, append the ``--workspace-scope``
flag when you call the ``agentengine secret set`` command.

Database Access
~~~~~~~~~~~~~~~

When you use the ``agentengine atlas setup`` command to create an Atlas
connection, the connection grants ``readWriteAnyDatabase`` access on the destination cluster.

If you need database access with a narrower scope, manually create a database
user in Atlas. Then, set a ``MONGODB_URI`` workspace secret
with credentials scoped to the ``MDB_AGENTIC_STORE_DB`` and
``MONGOMEM_DB_NAME`` databases.

Agent Isolation
~~~~~~~~~~~~~~~

All agents deployed in a project share the same Orchestration Engine,
or agent control plane. The Orchestration Engine does not enforce
authentication or authorization against the calling agents.

If you need stronger agent isolation, deploy your agents in
independent projects.

Tool Isolation
~~~~~~~~~~~~~~

Tools run in the agent sandbox by default. To run a tool in the tool
sandbox instead, list it in the ``sandboxes.tool.tools`` field of your
``agent.yaml`` file. You can list the tool name or a glob pattern that
matches the tool name. Tools that request delegated credentials can
run only in the tool sandbox.

The agent sandbox and the tool sandbox isolate their workloads from
each other. For example, tools in the tool sandbox run separately from
your agent's control flow in the agent sandbox. However, tools that run
in the same sandbox are not isolated from each other.

Tools in the same sandbox can access all secrets and egress destinations
that you configure for that sandbox. The {+platform-short+} does not
scope secrets or network access to individual tools. Tools that run in
the agent sandbox also share the agent sandbox's secrets and egress
destinations with your agent code. If your agent requires isolation
between tools, do not treat either sandbox as a per-tool security
boundary.

If your agent uses a tool sandbox, each session reserves one tool
sandbox while the session is active. All tool calls in the session
that the {+platform-short+} routes to the tool sandbox run in that
sandbox. The {+platform-short+} does not create a new tool sandbox for
each tool call. If a session is idle for longer than the
``scaling.tool_idle_ttl_seconds`` value, the {+platform-short+}
releases its tool sandbox. When the session becomes active again, it
uses a new tool sandbox.

To configure sandbox secrets and egress destinations, see
:ref:`agentic-platform-agent-contract-yaml` and
:ref:`agentic-platform-network-egress`.
