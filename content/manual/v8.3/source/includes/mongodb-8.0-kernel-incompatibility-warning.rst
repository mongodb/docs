.. warning:: Some MongoDB Versions Incompatible with Linux Kernel 6.19 - 7.0.13

   Due to an incompatibility between certain Linux kernel releases and
   the currently vendored version of TCMalloc, Linux kernel versions
   6.19 through 7.0.13 can cause MongoDB to crash. Linux kernel
   version 7.0.14 and later resolves this incompatibility. MongoDB 7.0
   is not affected.

   This incompatibility affects all MongoDB packages, including those
   obtained from the MongoDB website, a package manager, or Docker.

   How MongoDB responds on an affected kernel depends on the MongoDB
   version:

   .. list-table::
      :header-rows: 1

      * - MongoDB Version
        - Linux Kernel 6.19 - 7.0.13
        - Linux Kernel 7.0.14+
      * - - 7.0.x
        - Supported
        - Supported
      * - - 8.0.0 - 8.0.20
        - MongoDB crashes approximately 60 seconds after startup,
          and can corrupt data.
        - Supported
      * - - 8.0.21 - 8.0.29
          - 8.3.0 - 8.3.8
        - MongoDB exits during startup.
        - MongoDB exits during startup.
      * - - 8.0.30+
          - 8.3.9+
          - 9.0.x
        - MongoDB exits during startup.
        - Supported

   To run MongoDB on an affected system, upgrade to Linux kernel
   version 7.0.14 or later.

   If running MongoDB 8.0.21 - 8.0.29 or 8.3.0 - 8.3.8, upgrade to
   MongoDB 8.0.30 / 8.3.9 or later. A kernel upgrade alone doesn't
   resolve the issue, since these versions exit during startup on all
   kernel versions 6.19 or later.

   MongoDB identifies the kernel by the ``uname -r`` release string.
   On distributions that use a different version string, such as
   Ubuntu's ``7.0.0-XX-generic`` kernel, MongoDB 8.0.21 - 8.0.36,
   8.3.0 - 8.3.15, and 9.0.0 - 9.0.3 exit during startup even on
   kernel 7.0.14 and later. On such distributions, a kernel upgrade
   doesn't resolve the issue. Upgrade to MongoDB 8.0.37 / 8.3.16 /
   9.0.4 or later.
