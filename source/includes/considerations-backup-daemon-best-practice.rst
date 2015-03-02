Resyncing Production Deployments
++++++++++++++++++++++++++++++++

For production deployments, it is recommended that as a best practice you
periodically (annually) :doc:`resync </tutorial/resync-backup>` all
backed-up replica sets. When you resync, data is read from a secondary in
each replica set. During resync, no new snapshots are generated.
