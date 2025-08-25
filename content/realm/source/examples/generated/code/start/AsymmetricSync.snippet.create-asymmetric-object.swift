@MainActor
func useRealm(_ asymmetricRealm: Realm, _ user: User) async {
    try! asymmetricRealm.write {
        asymmetricRealm.create(WeatherSensor.self,
                               value: [ "_id": ObjectId.generate(),
                                        "deviceId": "WX1278UIT",
                                        "temperatureInFahrenheit": 66.7,
                                        "barometricPressureInHg": 29.65,
                                        "windSpeedInMph": 2
                                        ])
    }
}
