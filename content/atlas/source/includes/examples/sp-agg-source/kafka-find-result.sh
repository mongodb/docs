{
  _id: ObjectId('66ad2edfd4fcac13b1a28ce3'),
  airTemperature: { quality: '1', value: 27.7 },
  atmosphericPressureChange: {
    quantity24Hours: { quality: '9', value: 99.9 },
    quantity3Hours: { quality: '1' },
    tendency: { code: '1', quality: '1' }
  },
  atmosphericPressureObservation: {
    altimeterSetting: { quality: '1', value: 1015.9 },
    stationPressure: { quality: '1', value: 1021.9 }
  },
  callLetters: 'CGDS',
  dataSource: '4',
  dewPoint: { quality: '9', value: 25.7 },
  elevation: 9999,
  extremeAirTemperature: {
    code: 'N',
    period: 99.9,
    quantity: '9',
    value: -30.4
  },
  ingestionTime: ISODate('2024-08-02T19:09:18.071Z'),
  liquidPrecipitation: {
    condition: '9',
    depth: 160,
    period: 24,
    quality: '2'
  },
  pastWeatherObservationManual: {
    atmosphericCondition: { quality: '1', value: '8' },
    period: { quality: '9', value: 3 }
  },
  position: { coordinates: [ 153.3, 50.7 ], type: 'Point' },
  precipitationEstimatedObservation: {
    discrepancy: '4',
    estimatedWaterDepth: 4
  },
  presentWeatherObservationManual: { condition: '53', quality: '1' },
  pressure: { quality: '1', value: 1016.3 },
  qualityControlProcess: 'V020',
  seaSurfaceTemperature: { quality: '9', value: 27.6 },
  sections: [ 'AA2', 'SA1', 'MW1', 'AG1', 'GF1' ],
  skyCondition: {
    cavok: 'N',
    ceilingHeight: { determination: 'C', quality: '1', value: 6900 }
  },
  skyConditionObservation: {
    highCloudGenus: { quality: '1', value: '05' },
    lowCloudGenus: { quality: '9', value: '03' },
    lowestCloudBaseHeight: { quality: '9', value: 150 },
    lowestCloudCoverage: { quality: '1', value: '05' },
    midCloudGenus: { quality: '9', value: '08' },
    totalCoverage: { opaque: '99', quality: '1', value: '06' }
  },
  skyCoverLayer: {
    baseHeight: { quality: '9', value: 99999 },
    cloudType: { quality: '9', value: '05' },
    coverage: { quality: '1', value: '04' }
  },
  st: 'x+35700-027900',
  type: 'SAO',
  visibility: {
    distance: { quality: '1', value: 4000 },
    variability: { quality: '1', value: 'N' }
  },
  waveMeasurement: {
    method: 'I',
    seaState: { code: '99', quality: '9' },
    waves: { height: 99.9, period: 14, quality: '9' }
  },
  wind: {
    direction: { angle: 280, quality: '9' },
    speed: { quality: '1', rate: 30.3 },
    type: '9'
  }
}

