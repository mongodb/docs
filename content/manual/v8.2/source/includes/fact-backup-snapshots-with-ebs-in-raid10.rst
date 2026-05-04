Snapshots with Amazon EBS in a RAID 10 Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If your deployment depends on Amazon's Elastic Block Storage (EBS) with
RAID configured within your instance, it is impossible to get a
consistent state across all disks using the platform's snapshot tool. As
an alternative, you can do one of the following:

- Set a :dbcommand:`fsync` lock to flush all writes and lock the
  cluster against new writes to help reduce the likelihood of an
  inconsistent state occurring during the backup process. 

  If you choose this option see :ref:`backup-without-journaling`.

- Configure :term:`LVM` to run and hold your MongoDB data files on top of the
  RAID within your system.

  If you choose this option, perform the LVM backup operation described
  in :ref:`lvm-backup-operation`.
