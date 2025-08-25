const App = () => {
  // Getting access to our opened realm instance
  const realm = useRealm();

  const handleAddSensor = () => {
    realm.write(() => {
      realm.create('WeatherSensor', {
        _id: weatherSensorPrimaryKey,
        deviceId: 'WX1278UIT',
        temperatureInFahrenheit: 66.7,
        barometricPressureInHg: 29.65,
        windSpeedInMph: 2,
      });
    });
  };

  return (
    <Button
      title='Add A New Sensor'
      onPress={() => handleAddSensor()}
    />
  );
};
