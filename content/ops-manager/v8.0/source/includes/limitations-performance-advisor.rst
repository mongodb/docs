The Performance Advisor cannot suggest indexes for MongoDB databases
configured to use the :option:`ctime timestamp format <mongod --timeStampFormat>`.
As a workaround, set the timestamp format for such databases to either
:option:`iso8601-utc <mongod --timeStampFormat>`
or :option:`iso8601-local <mongod --timeStampFormat>`.