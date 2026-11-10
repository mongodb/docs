For :ref:`encrypted storage engines <encrypted-storage-engine>` that
use ``AES256-GCM`` encryption mode, ``AES256-GCM`` requires that every
process use a unique counter block value with the key.

.. include:: /includes/extracts/4.2-changes-ese-key-rollover.rst


.. tip::

   - In general, if using filesystem based backups for MongoDB
     Enterprise 4.2+, use the "hot" backup feature, if possible.
     
   - For MongoDB Enterprise versions 4.0 and earlier, if you use
     ``AES256-GCM`` encryption mode, do :red:`not` make copies of
     your data files or restore from filesystem snapshots ("hot" or
     "cold").
