The procedure to upgrade to SCRAM **discards** the ``MONGODB-CR``
credentials used by 2.6. As such, the procedure is **irreversible**,
short of restoring from backups.

The procedure also disables ``MONGODB-CR`` as an authentication
mechanism.
