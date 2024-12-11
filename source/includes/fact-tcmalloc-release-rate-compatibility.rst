In earlier versions, MongoDB used an older version of ``tcmalloc`` that: 

- Set the default ``tcmallocReleaseRate`` to ``1``. 
- Accepted values for ``tcmallocReleaseRate`` between ``0`` and ``10``, 
  inclusive.
