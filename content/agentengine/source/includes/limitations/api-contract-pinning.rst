.. _agent-engine-api-contract-pinning:

Pin an API Contract
~~~~~~~~~~~~~~~~~~~

The {+platform-short+} API publishes versioned contracts. To keep your
integration compatible when a new version ships, pin a specific contract
version by including the version in the ``Accept`` header of every request
and follow-up read. Without a version in the header, requests receive the
latest published contract, which can change over time. The {+platform-short+}
supports the ``2026-09-20-preview`` contract version.

Pinning Behavior
^^^^^^^^^^^^^^^^

When you pin a contract version, the {+platform-short+} returns the request
and response shapes defined in that version. A pinned version is a
per-request selection, not account-level or first-use behavior.

Pinning the API contract doesn't freeze:

- Agent logic or agent deployments
- Stored data (sessions, memory, traces)
- Permissions and roles
- CLI releases
- SDK releases
- Model versions

Pinning preserves only the API request and response shapes.

Pinned Request Examples
^^^^^^^^^^^^^^^^^^^^^^^

The following examples show unpinned and pinned requests to the
invocation API.

Unpinned Request
++++++++++++++++

.. code-block:: bash

   curl --include \
     -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     "https://agentengine.mongodb.com/api/v1/projects/$PROJECT_ID/workspaces/$WORKSPACE_ID/invoke" \
     -d '{"message": "Hello, agent!"}'

The response resembles the following output:

.. code-block:: text
   :copyable: false

   HTTP/2 200
   content-type: application/json; charset=utf-8

.. code-block:: json
   :copyable: false

   {
     "success": true,
     "response": "Agent response",
     "execution_id": "9f8ba6a9-9c4d-44d7-8118-9300795b57db",
     "status": "completed"
   }

Pinned to a Specific Version
++++++++++++++++++++++++++++

.. code-block:: bash

   curl --include \
     -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H "Accept: application/vnd.agent-engine-<VERSION>+json" \
     -H "Content-Type: application/json" \
     "https://agentengine.mongodb.com/api/v1/projects/$PROJECT_ID/workspaces/$WORKSPACE_ID/invoke" \
     -d '{"message": "Hello, agent!"}'

The response resembles the following output:

.. code-block:: text
   :copyable: false

   HTTP/2 200
   content-type: application/vnd.agent-engine-<VERSION>+json; charset=utf-8

.. code-block:: json
   :copyable: false

   {
     "success": true,
     "response": "Agent response",
     "execution_id": "a0ad6e8b-60f1-47d4-8d25-fdd2e4d44bcf",
     "status": "completed"
   }

The response body is identical in both cases. The ``content-type`` header
reflects the pinned version when a selector is provided. All responses include
a ``vary: Accept`` header.

Pinned Streaming Request
++++++++++++++++++++++++

.. code-block:: bash

   curl -N --include \
     -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H "Accept: text/event-stream, application/vnd.agent-engine-<VERSION>+json" \
     -H "Content-Type: application/json" \
     "https://agentengine.mongodb.com/api/v1/projects/$PROJECT_ID/workspaces/$WORKSPACE_ID/invokeStream" \
     -d '{"message": "Hello, agent!"}'

The response resembles the following output:

.. code-block:: text
   :copyable: false

   HTTP/2 200
   content-type: text/event-stream

The response content type for streaming is ``text/event-stream``, not a
versioned type. The version selector applies to individual event structure,
not to the transport. To learn more about streaming responses and event
formats, see :ref:`agent-engine-invoke-agent`.

Follow-Up Reads with Pinning
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After invoking an agent, you may need to check the execution status or
retrieve results. When you read an execution by ID, include the same version
in the ``Accept`` header to ensure consistency with the pinned version:

.. code-block:: bash

   curl --include \
     -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H "Accept: application/vnd.agent-engine-<VERSION>+json" \
     "https://agentengine.mongodb.com/api/v1/projects/$PROJECT_ID/executions/$EXECUTION_ID?workspace_id=$WORKSPACE_ID"

The response resembles the following output:

.. code-block:: text
   :copyable: false

   HTTP/2 200
   content-type: application/vnd.agent-engine-<VERSION>+json

.. code-block:: json
   :copyable: false

   {
     "success": true,
     "execution": {
       "execution_id": "a0ad6e8b-60f1-47d4-8d25-fdd2e4d44bcf",
       "status": "completed",
       "message": "Hello, agent!",
       "session_id": "e243a75e-7452-4167-bee7-d687095a81e1"
     }
   }

Resume Suspended Executions
^^^^^^^^^^^^^^^^^^^^^^^^^^^

When you resume a suspended execution for human-in-the-loop approval, pin
the contract version on the resume request just as you did on the initial
invocation. Include the ``X-Session-ID`` header from the suspend response:

.. code-block:: bash

   curl --include -X POST \
     -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H "Accept: application/vnd.agent-engine-<VERSION>+json" \
     -H "Content-Type: application/json" \
     -H "X-Session-ID: $SESSION_ID" \
     "https://agentengine.mongodb.com/api/v1/projects/$PROJECT_ID/workspaces/$WORKSPACE_ID/invoke" \
     -d "{\"resume_map\": {\"$INTERRUPT_ID\": {\"decision\": \"approve\", \"reviewer_notes\": \"optional context\"}}}"

The response follows the same pinning behavior as the initial invoke request.
To learn more about suspending and resuming executions, see
:ref:`agent-engine-human-in-the-loop`.

Routes That Ignore Version Selectors
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Some API routes don't participate in contract versioning and return plain
``application/json`` regardless of the version selector. These routes include:

- ``GET /health`` (health check)
- ``POST /api/v1/oauth/token`` (OAuth token endpoint)
- ``GET|POST|DELETE /api/v1/projects/{id}/mcp`` (MCP routes)
- Authentication and login routes (``/auth/*``, ``/login``, and similar)

Pinning a version selector on these routes has no effect. The API ignores the header.

Pin the CLI Version
~~~~~~~~~~~~~~~~~~~

The ``agentengine`` CLI version is separate from the API contract version.
Pin the CLI version in your automation by specifying an exact version tag
in your build or deployment configuration:

.. code-block:: bash

   agentengine@X.Y.Z

Replace ``X.Y.Z`` with the version that you want. Pinning the version ensures
that the CLI doesn't advance automatically when you upgrade other dependencies.

To find available CLI versions, see the
`agentengine CLI releases <https://github.com/mongodb/agent-engine-client-libraries/releases>`_.

Authenticate API Requests
~~~~~~~~~~~~~~~~~~~~~~~~~

Authenticate API requests by including an ``Authorization`` header with a
service account access token:

.. code-block:: text

   Authorization: Bearer $ACCESS_TOKEN

Obtain access tokens through the ``POST /api/v1/oauth/token`` client-credentials
OAuth flow. To learn how to create and manage service accounts, see
:ref:`agent-engine-api-keys-service-accounts`.

Troubleshooting
~~~~~~~~~~~~~~~

Unsupported or Malformed Version
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you pin a version that doesn't exist or is malformed, the API returns
``406 Not Acceptable``:

.. code-block:: bash

   curl --include \
     -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H "Accept: application/vnd.agent-engine-2099-01-01-preview+json" \
     -H "Content-Type: application/json" \
     "https://agentengine.mongodb.com/api/v1/projects/$PROJECT_ID/workspaces/$WORKSPACE_ID/invoke" \
     -d '{"message": "Hello, agent!"}'

The response resembles the following output:

.. code-block:: text
   :copyable: false

   HTTP/2 406
   content-type: application/json; charset=utf-8

.. code-block:: json
   :copyable: false

   {
     "error": 406,
     "errorCode": "UNSUPPORTED_API_VERSION",
     "detail": "The requested API version is not supported. Supported versions: 2026-09-20-preview.",
     "reason": "Not Acceptable",
     "parameters": ["Accept"]
   }

The error response is ``application/json`` (not the dated vendor type) because
no version was accepted.

To resolve this error:

- Remove the version selector to revert to the latest published contract.
- Use a supported version from the error response list.
- Ensure the version string includes the required ``-preview`` suffix.

Streaming Endpoint Without Event Stream Support
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you exclude ``text/event-stream`` from the ``Accept`` header on a streaming
endpoint, the API returns ``406 Not Acceptable``:

.. code-block:: bash

   curl --include \
     -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H "Accept: application/vnd.agent-engine-2026-09-20-preview+json" \
     "https://agentengine.mongodb.com/api/v1/projects/$PROJECT_ID/workspaces/$WORKSPACE_ID/invokeStream" \
     -d '{"message": "Hello, agent!"}'

The response resembles the following output:

.. code-block:: json
   :copyable: false

   {
     "error": 406,
     "errorCode": "UNACCEPTABLE_MEDIA_TYPE",
     "detail": "This operation supports text/event-stream, which the Accept header excludes. Remove unsupported media-type parameters or accept this type with a positive q value.",
     "reason": "Not Acceptable",
     "parameters": ["Accept"]
   }

Resolve this error by including ``text/event-stream`` in the ``Accept`` header
for streaming endpoints.