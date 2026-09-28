.. warning:: MongoDB Is Incompatible with Linux Kernel 6.19 Through 7.0.13

   Due to an incompatibility between certain Linux kernel releases and
   the currently vendored version of TCMalloc, running MongoDB with a
   Linux kernel version from 6.19 through 7.0.13 can cause MongoDB to
   crash. To prevent this crash, MongoDB detects these kernel versions
   and stops during startup. This incompatibility affects all MongoDB
   packages, including those obtained from the MongoDB website, a
   package manager, or Docker.

   Linux kernel version 7.0.14 and later resolves this incompatibility.
   To run MongoDB on an affected system, upgrade to Linux kernel
   version 7.0.14 or later.
