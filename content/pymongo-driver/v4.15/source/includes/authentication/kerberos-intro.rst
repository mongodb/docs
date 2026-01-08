Overview
--------

The Generic Security Services API (GSSAPI) authentication mechanism allows you to
use your principal name to authenticate to a Kerberos service.
You can use this mechanism only when authenticating to MongoDB Enterprise Advanced.

Code Placeholders 
~~~~~~~~~~~~~~~~~

The code examples on this page use the following placeholders:

- ``<username>``: Your :wikipedia:`URL-encoded <Percent-encoding>` principal name. For
  example: ``"username%40REALM.ME"``
- ``<password>``: Your Kerberos user's password.
- ``<hostname>``: The network address of your MongoDB deployment.
- ``<port>``: The port number of your MongoDB deployment. If you omit this parameter,
  the driver uses the default port number (``27017``).

To use the code examples on this page, replace these placeholders with your own values.

.. include:: /includes/authentication/percent-encoding.rst