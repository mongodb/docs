The Performance Advisor can't suggest indexes for MongoDB databases
configured to use the :manual:`ctime timestamp format
</reference/program/mongod/#cmdoption-mongod-timestampformat>`. As a
workaround, set the timestamp format for such databases to either
:manual:`iso8601-utc
</reference/program/mongod/#cmdoption-mongod-timestampformat>` or
:manual:`iso8601-local
</reference/program/mongod/#cmdoption-mongod-timestampformat>`.
