Starting in MongoDB 4.0, the oplog can grow past its configured size
limit to avoid deleting the :data:`majority commit point
<replSetGetStatus.optimes.lastCommittedOpTime>`.
