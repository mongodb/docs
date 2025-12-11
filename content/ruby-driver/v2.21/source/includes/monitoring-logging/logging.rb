# start-logger
require 'mongo'
require 'logger'

# Create a new Logger instance
logger = Logger.new(STDOUT) # You can also log to a file by providing a file path

# Set the log level (optional)
logger.level = Logger::DEBUG # Options are DEBUG, INFO, WARN, ERROR, FATAL, UNKNOWN

# Configures the Mongo client to use the logger
client = Mongo::Client.new(['127.0.0.1:27017'], logger: logger)

# Tests the logger with an insert operation
client[:test_collection].insert_one({ name: 'Test' })
# end-logger

# start-global-logging
# Sets the logger level globally
Mongo::Logger.level == LOGGER.DEBUG
# end-global-logging