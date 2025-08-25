// Initialize a serial queue, and
// perform realm operations on it
let serialQueue = DispatchQueue(label: "serial-queue")
serialQueue.async {
    let realm = try! Realm(configuration: .defaultConfiguration, queue: serialQueue)
    // Do something with Realm on the non-main thread
}
