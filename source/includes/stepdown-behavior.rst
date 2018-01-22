.. versionadded:: 3.0

The |command-method-name| |command-method| attempts to
terminate long running user operations that block the primary
from stepping down, such as an index build, a write operation or a
map-reduce job.

The |command-method| then initiates a catchup period where it waits up to
``secondaryCatchUpPeriodSeconds``, by default 10 seconds, for a
secondary to become up-to-date with the primary. The primary only steps
down if a secondary is up-to-date with the primary during the
catchup period to prevent :doc:`rollbacks </core/replica-set-rollbacks>`.

If no electable secondary meets this criterion by the end of the waiting
period, the primary does not step down and the |command-method| errors.
|force-option|

Once the primary steps down successfully, that node cannot become the
primary for the remainder of the |stepdown-secs| period,
which began when the node received the |command-method|. The
|command-method-name| |command-method| forces all clients currently
connected to the database to disconnect. This helps ensure that the
clients maintain an accurate view of the replica set.

Because the disconnect includes the connection used to run the
|command-method|, you cannot retrieve the return status of the
|command-method| if the |command-method| completes successfully. You can
only retrieve the return status of the |command-method| if it errors.
When running the |command-method| in a script, the script should account
for this behavior.
