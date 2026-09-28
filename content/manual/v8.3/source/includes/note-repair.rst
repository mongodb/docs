If you are running with :term:`journaling <journal>` enabled, there is
almost never any need to run repair since the server can use the
journal files to restore the data files to a clean state automatically.
However, you may need to run repair in cases where you need to recover
from a disk-level data corruption.
