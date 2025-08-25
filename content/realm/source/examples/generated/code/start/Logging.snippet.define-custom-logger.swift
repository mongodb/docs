// Create an instance of `Logger` and define the log function to invoke.
let logger = Logger(level: .detail) { level, message in
    // You may pass log information to a logging service, or
    // you could simply print the logs for debugging. Define
    // the log function that makes sense for your application.
    print("REALM DEBUG: \(Date.now) \(level) \(message) \n")
}
