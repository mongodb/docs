For collection names that contain non-ascii characters,
:binary:`~bin.mongodump` outputs the corresponding filenames with
percent-encoded names. However, to restore these collections, do not
use the encoded names. Instead, use the namespace with the non-ascii
characters.
  
For example, if the dump directory contains
``dump/test/caf%C3%A9s.bson``, specify ``--nsInclude "test.cafés"``.
