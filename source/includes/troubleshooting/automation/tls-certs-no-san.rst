To *temporarily* use |tls| certificates without a |san-dns|, set the
``$GODEBUG`` environment variable. This workaround **will not** be
supported in upcoming releases of the {+mdbagent+}.

To *temporarily* use |tls| certificates without a |san-dns|,
perform one of the following actions:

1. Upgrade your {+mdbagent+} packages, which automatically sets the
   ``$GODEBUG`` environment variable on your host, or

#. Manually set the ``$GODEBUG`` environment variable for the Agent 
   process to ``x509ignoreCN=0`` on the host on which you will install 
   the RPM, DEB, or Windows packages.

In `Go 1.17 <https://golang.org/doc/go1.16#crypto/x509>`_, the
``GODEBUG=x509ignoreCN=0`` flag **won't** be supported.
