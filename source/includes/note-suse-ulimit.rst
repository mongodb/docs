.. note::

   SUSE Linux Enterprise Server 11 and potentially other versions of SLES
   and other SUSE distributions ship with virtual memory address space limited
   to 8GB by default. This *must* be adjusted in order to prevent virtual memory
   allocation failures as the database grows.

   The SLES packages for MongoDB adjust these limits in the default scripts,
   but you will need to make this change manually if you are using custom
   scripts and/or the tarball release rather than the SLES packages.
