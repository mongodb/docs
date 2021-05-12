You can *temporarily* continue to use |tls| certificates without a
SAN by setting the ``$GODEBUG`` environment variable. However, this
workaround **will not** be supported in upcoming releases of the
{+mdbagent+}. 

To *temporarily* use |tls| certificates without a SAN,
you must either:

1. Upgrade your {+mdbagent+} packages, which automatically sets the
   ``$GODEBUG`` environment variable on your host, or

#. Manually set the ``$GODEBUG`` environment variable for the Agent 
   process to ``x509ignoreCN=0`` on the host on which you will install 
   the RPM, DEB, or Windows packages.

In `Go 1.17 <https://golang.org/doc/go1.16#crypto/x509>`_, the
``GODEBUG=x509ignoreCN=0`` flag **will not** be supported.
