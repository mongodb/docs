Run the following to confirm your authentication state:

.. code-block:: javascript

   db.adminCommand({ connectionStatus: 1 })

Confirm that ``authInfo.authenticatedUsers`` includes the
expected user.
