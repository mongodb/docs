My driver version is fully compatible with {+two-mdb-versions-back+} and {+one-mdb-version-back+}, but MongoDB {+two-mdb-versions-back+} is EOL. What does my upgrade path look like? 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you're upgrading driver versions because your current {+mdb-server+} version has reached its
end-of-life (EOL) date, we recommend using a driver version that is fully compatible (✓)
with your MongoDB version. For example, if you're upgrading to {+mdb-server+}
{+one-mdb-version-back+}, you can use |driver| version
|first-version-fully-compat-with-last-mdb| or later.

However, if you're upgrading to {+mdb-server+} {+newest-mdb-server-major-version+},
we recommend upgrading to driver version |first-version-fully-compat-with-current-mdb|
or later. This ensures that your applications can use all features available in
{+mdb-server+} {+newest-mdb-server-major-version+} and provides longer term compatibility
with future versions.