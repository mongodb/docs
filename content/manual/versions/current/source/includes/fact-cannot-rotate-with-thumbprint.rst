.. note::

   You cannot use the :dbcommand:`rotateCertificates` command or the
   :method:`db.rotateCertificates()` shell method when using
   :setting:`net.tls.certificateSelector` or
   :option:`--tlsCertificateSelector <mongod --tlsCertificateSelector>`
   set to ``thumbprint``
