@MainActor
func openSyncedRealm(user: User) async {
    do {
        var asymmetricConfig = user.flexibleSyncConfiguration()
        asymmetricConfig.objectTypes = [WeatherSensor.self]
        let asymmetricRealm = try await Realm(configuration: asymmetricConfig)
        await useRealm(asymmetricRealm, user)
    } catch {
        print("Error opening realm: \(error.localizedDescription)")
    }
}
