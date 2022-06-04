The user specified in the connection string must have the
:atlasrole:`atlasAdmin` role.

To use ``mongosync`` in the reverse direction, you must `create a
custom role </atlas/reference/api/custom-roles-create-a-role/>`__ that
grants the following ActionTypes:

- setUserWriteBlockMode
- bypassWriteBlockingMode

The ``setUserWriteBlockMode`` and ``bypassWriteBlockingMode`` user
actions are available starting in MongoDB 6.0. To create the custom
roles, all clusters in a project must be on MongoDB 6.0 or higher.

