The procedure to upgrade to ``SCRAM-SHA-1`` **discards** the
``MONGODB-CR`` credentials used by 2.6. As such, the procedure is
**irreversible**, short of restoring from backups.

The procedure also disables ``MONGODB-CR`` as an authentication
mechanism.
