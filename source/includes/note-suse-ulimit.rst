SUSE Linux Enterprise Server and potentially other SUSE distributions ship
with virtual memory address space limited to 8 GB by default. You *must*
adjust this in order to prevent virtual memory allocation failures as the
database grows.

The SLES packages for MongoDB automatically adjust these limits in
their default init script. If you are starting MongoDB manually without
the provided init script, are using your own custom init script, or
are using the TGZ tarball release, you must make these changes
yourself.
