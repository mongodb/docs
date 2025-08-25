// Observe connectionState for changes using KVO
let observer = syncSession.observe(\.connectionState, options: [.initial]) { (syncSession, change) in
    switch syncSession.connectionState {
    case .connecting:
        print("Connecting...")
    case .connected:
        print("Connected")
    case .disconnected:
        print("Disconnected")
    default:
        break
    }
}

// Observe using Combine
let cancellable = syncSession.publisher(for: \.connectionState)
    .sink { connectionState in
        switch connectionState {
        case .connecting:
            print("Connecting...")
        case .connected:
            print("Connected")
        case .disconnected:
            print("Disconnected")
        default:
            break
        }
    }
