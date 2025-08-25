let logger = Logger(level: .info) { level, message in
    // You may pass log information to a logging service, or
    // you could simply print the logs for debugging. Define
    // the log function that makes sense for your application.
    print("REALM DEBUG: \(Date.now) \(level) \(message) \n")
}

// Set a logger as the default
Logger.shared = logger

// After setting a default logger, you can change
// the log level at any point during the app lifecycle
Logger.shared.level = .debug
