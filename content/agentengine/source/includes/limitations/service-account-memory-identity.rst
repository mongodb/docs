When a service account invokes a deployed agent, the
{+platform-short+} uses the service account's own identity as
the runtime memory identity. The platform ignores any end-user
``user_id`` value that the invoke request or the ``agentengine
invoke --user-id`` flag provides.

Automatic turn recording, extraction, consolidation, and
``app.memory`` operations use this resolved identity. As a
result, invocations that authenticate through the same service
account share one memory user scope.

This limitation applies only to deployed agents that a service
account invokes. The standalone, project-scoped memory service
is not affected. This service continues to accept explicit
``user_id`` and ``session_id`` values from the caller.

To isolate memory by end user, call the standalone memory
service from your application and pass an explicit ``user_id``
and ``session_id`` value to each call. To learn more, see
:ref:`agentic-platform-memory-only`.
