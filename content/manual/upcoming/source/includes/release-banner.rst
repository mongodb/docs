.. NOTE: Release Banner: The purpose of this file is to provide
   a single source for release banner information, which is used
   in a few dozen places throughout the server docs, and to
   streamline the release process for server docs.

   - For an upcoming major release with no release candidates yet
     available, this file should have an include directive pointed
     at in-dev.rst. Once release candidates become available, point
     the include directive at rc-available.rst instead.

   - For an upcoming minor release, this file should include
     directives for both in-dev.rst and minor-release.rst.

   - For a current minor release, this file should have an include
     directive pointed at minor-release.rst.

   - For a current major release, this file should have this
     comment only, so that it is present and ready for the next
     minor release.

   This include should **not** be used on release notes pages.
   The contents of this include changes from release to release,
   while release notes should remain static. Use the in-dev,
   rc-available, or minor-release includes directly in release
   notes.

.. include:: /includes/rc-available.rst

