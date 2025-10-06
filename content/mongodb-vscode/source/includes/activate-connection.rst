You can connect |vsce| to only one deployment at a time. To change the
active connection to a different deployment, or to connect to a 
deployment from which you were disconnected:

.. include:: /includes/steps/activate-connection.rst

Launch MongoDB Shell
~~~~~~~~~~~~~~~~~~~~

You can connect the :mongosh:`MongoDB Shell </>` or legacy
:binary:`mongo <mongo>` shell to your active deployment.


Considerations
``````````````

- The shell that |vsce| uses to connect to your deployment is
  determined by the :guilabel:`Shell` setting in your
  :ref:`extension settings <vsce-settings>`. You can choose either
  the :mongosh:`MongoDB Shell </>` or the legacy :binary:`mongo <mongo>` shell.

- The path to your selected shell must exist in your system's ``PATH``.
  If it does not exist in your ``PATH``, the operation errors.

Procedure
`````````

To connect the shell to your active deployment:

a. In the |vsce| :guilabel:`Connections` list, right-click your active
   deployment.

#. Select :guilabel:`Launch MongoDB Shell`.

|vsce| opens the :guilabel:`Terminal` window in VS Code and launches
the shell connected to your selected deployment.

.. seealso::

   :mongosh:`Perform CRUD Operations in the MongoDB Shell </crud>`
