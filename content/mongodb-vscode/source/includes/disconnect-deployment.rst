|vsce| provides two methods to disconnect from a deployment. You can:

- Disconnect with the Command Palette.
- Disconnect from the :guilabel:`MongoDB` view in the 
  :guilabel:`Activity Bar`.

.. tabs::

   .. tab:: Command Palette
      :tabid: command-palette

      .. include:: /includes/steps/disconnect-command-palette.rst

   .. tab:: MongoDB View
      :tabid: mdb-view

      .. include:: /includes/steps/disconnect-mongodb-view.rst

Disconnecting from a MongoDB instance closes the |vsce| connection to 
the active instance. You must :ref:`reconnect <vsce-connect-task>` to 
interact with data in your deployment again.
