Both Windows and macOS offer system certificate stores that can be
accessed across applications via OS specific APIs. Starting in MongoDB
version 4.0, certificates can be retrieved from these stores by
searching for them via certain well-defined selectors that are available
in all certificates.

On the command line you can pass the :option:`--sslCertificateSelector
<mongod --sslCertificateSelector>` followed by the certificate selector
you would like to use and the value of that selector.

.. include:: /includes/extracts/ssl-facts-certificate-selector-properties.rst

Use the selectors by passing <parameter>=<value> on the
command line. For example, for a certificate with the common name or
subject ``my.dev.server``, you would use:



