For macOS or Linux hosts, the |fqdn| can be found using the
following command:

.. code-block:: shell

   > hostname -f

   mongodb.example.com

For Windows hosts, the host must be connected to the internet and
attached to a domain. The |fqdn| can then be found using the following
command:

.. code-block:: powershell

   PS C:\> systeminfo | findstr /B /C:"Host" /C:"Domain"
   Host Name:                 mongodb
   Domain:                    example.com

Combine the ``Host Name`` and ``Domain`` with a ``.`` to get the
|fqdn|. With the previous example, the |fqdn| is
``mongoodb.example.com``.
