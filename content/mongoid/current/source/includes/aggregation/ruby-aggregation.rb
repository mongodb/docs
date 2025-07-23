band_ids = Band.collection.aggregate([
  { '$lookup' => {
    from: 'tours',
    localField: '_id',
    foreignField: 'band_id',
    as: 'tours',
  } },
  { '$lookup' => {
    from: 'awards',
    localField: '_id',
    foreignField: 'band_id',
    as: 'awards',
  } },
  { '$match' => {
    'tours.year' => {'$gte' => 2000},
    'awards._id' => {'$exists' => true},
  } },
  {'$project' => {_id: 1}},
])

bands = Band.find(band_ids.to_a)