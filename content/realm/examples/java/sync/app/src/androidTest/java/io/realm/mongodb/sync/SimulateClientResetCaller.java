package io.realm.mongodb.sync;

public class SimulateClientResetCaller {
    public static void simulateClientReset(Sync sync, SyncSession session) {
        sync.simulateClientReset(session);
    }
}
