.. COMMENT Only for use with mongo shell and not MongoDB tools

.. warning::

   For SSL connections (``--ssl``) to :program:`mongod` and
   :program:`mongos`, if the the :program:`mongo` shell runs without
   the ``--sslCAFile <CAFile>`` option (i.e. specifies the
   ``--sslAllowInvalidCertificates`` instead), the :program:`mongo`
   shell will not attempt to validate the server certificates. This
   creates a vulnerability to expired :program:`mongod` and
   :program:`mongos` certificates as well as to foreign processes
   posing as valid :program:`mongod` or :program:`mongos` instances.
   Ensure that you *always* specify the CA file to validate the server
   certificates in cases where intrusion is a possibility.

