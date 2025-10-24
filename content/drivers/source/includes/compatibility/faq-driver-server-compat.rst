My driver version is partially compatible (⊛) with MongoDB {+newest-mdb-server-major-version+}. Will my application work?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If your application works on a currently supported MongoDB version, it should also
work with {+newest-mdb-server-major-version+}, but we
strongly recommend that you test it in a non-production environment. A partially
compatible driver version doesn't support every new feature of the {+mdb-server+} version
it's connecting to. All versions of |the-driver-name| between
|first-version-partially-compat-with-current-mdb| and
|last-version-partially-compat-with-current-mdb| are partially compatible with 
{+mdb-server+} {+newest-mdb-server-major-version+}.

If your application doesn't work with MongoDB {+newest-mdb-server-major-version+},
we recommend upgrading to a driver version that is fully compatible (✓) with it.
For |the-driver-name|, this includes version |first-version-fully-compat-with-current-mdb|
or later. Using a fully compatible driver version ensures long-term stability and allows
your application to use the latest MongoDB features.

For a list of features added or removed in each version of your driver, see the driver's
|release-notes-link|. For a list of features added or removed in each version of {+mdb-server+},
see the :manual:`{+mdb-server+} release notes </release-notes/>`.