class MyChangeStreamDelegate: ChangeEventDelegate {
    
    func changeStreamDidOpen(_ changeStream: RealmSwift.ChangeStream) {
        print("Change stream opened: \(changeStream)")
    }
    
    func changeStreamDidClose(with error: Error?) {
        if let anError = error {
            print("Change stream closed with error: \(anError.localizedDescription)")
        } else {
            print("Change stream closed")
        }
    }
    
    func changeStreamDidReceive(error: Error) {
        print("Received error: \(error.localizedDescription)")
    }
    
    func changeStreamDidReceive(changeEvent: RealmSwift.AnyBSON?) {
        guard let changeEvent = changeEvent else { return }
        guard let document = changeEvent.documentValue else { return }
        print("Change event document received: \(document)")
    }
}
