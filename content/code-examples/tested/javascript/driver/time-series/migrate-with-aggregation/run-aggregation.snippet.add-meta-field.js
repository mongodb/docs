{
  $addFields: {
    metaData: {
      st: '$st',
      position: '$position',
      elevation: '$elevation',
      callLetters: '$callLetters',
      qualityControlProcess: '$qualityControlProcess',
      type: '$type',
    },
  },
},
{
  $project: {
    _id: 1,
    ts: 1,
    metaData: 1,
    dataSource: 1,
    airTemperature: 1,
    dewPoint: 1,
    pressure: 1,
    wind: 1,
    visibility: 1,
    skyCondition: 1,
    sections: 1,
    precipitationEstimatedObservation: 1,
  },
},
