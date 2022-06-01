The user specified in the connection string must have the
:atlasrole:`atlasAdmin` role.

To use ``mongosync`` in reverse direction, you must `create a custom
role </atlas/reference/api/custom-roles-create-a-role/>`__ that grants the
following ActionTypes:

- setUserWriteBlockMode
- bypassWriteBlockingMode