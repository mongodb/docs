.. important::

   MMAPv1 is unsupported on big-endian and certain bi-endian
   architectures. This includes the IBM z/Architecture (``s390x``) and
   PowerPC (``ppc64le``) platforms. MongoDB returns an error if you
   set MMAPv1 as the storage engine on ``s390x`` and ``ppc64le``
   platforms.
