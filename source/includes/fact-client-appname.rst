.. versionadded:: 3.4

The identifier of the client application which ran the operation.
If the operation was run in :doc:`the MongoDB shell</mongo>`,
the appName is always ``"MongoDB Shell"``. If the operation
originated from a :ecosystem:`driver</drivers>`, ``appName`` may
be set to a custom string.
