
.. _manually-create-windows-service:

Start MongoDB Community Edition as a Windows Service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can install and configure MongoDB as a :guilabel:`Windows Service` during 
the install, and the MongoDB service starts upon successful installation.

You can also manually manage the service from the command line. To
start the MongoDB service from the command line, open a `Windows
command prompt/interpreter
<https://docs.microsoft.com/en-us/windows-server/administration/windows-
commands/cmd>`__ (``cmd.exe``) as an :guilabel:`Administrator`, and
run the following command:

.. include:: /includes/steps/create-manually-windows-service-for-mongodb.rst

Stop MongoDB Community Edition as a Windows Service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To stop/pause the MongoDB service, you can use the Services console:

#. From the Services console, locate the MongoDB service.

#. Right-click on the MongoDB service and click :guilabel:`Stop` (or :guilabel:`Pause`).

You can also manage the service from the command line. To stop the
MongoDB service from the command line, open a `Windows command
prompt/interpreter
<https://docs.microsoft.com/en-us/windows-server/administration/windows-
commands/cmd>`__ (``cmd.exe``) as an :guilabel:`Administrator`, and
run the following command:

.. code-block:: bat

   net stop MongoDB

Remove MongoDB Community Edition as a Windows Service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To remove the MongoDB service, first use the Services console to stop
the service. Then open a `Windows command prompt/interpreter
<https://docs.microsoft.com/en-us/windows-server/administration/windows-
commands/cmd>`__ (``cmd.exe``) as an :guilabel:`Administrator`, and
run the following command:

.. code-block:: bat

   sc.exe delete MongoDB
