.. warning:: MongoDB 8.0 Incompatible with Kernel 6.19
   
   Due to an incompatibility between a new kernel release and the
   currently vendored version of TCMalloc, running MongoDB 8.0 or newer
   with Linux kernel version 6.19 can cause MongoDB to crash on
   startup. This applies to all MongoDB packages, including those
   obtained from the MongoDB website, or obtained from package managers
   or Docker.

   As soon as a patched version of TCMalloc is available, MongoDB will
   upgrade to use it, and this compatibility issue will be resolved.
