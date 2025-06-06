By default, Relational Migrator includes telemetry that reports usage 
information and errors back to MongoDB to help improve the product. 
This telemetry does not include any sensitive details such as database 
connection strings, schema information or customer data. 

You can disable telemetry by editing the application's
``user.properties`` file, adding the following line, and restarting 
Relational Migrator:

.. code-block::

   migrator.app.telemetry.enable: false 

For information about the ``user.properties`` file location, see :ref:`<file-location>`.