MongoBulkWriteError: E11000 duplicate key error collection: sample_mflix.movies index: _id_ dup key: { _id: 11 }
Result: BulkWriteResult {
  insertedCount: 5,
  matchedCount: 0,
  modifiedCount: 0,
  deletedCount: 0,
  upsertedCount: 0,
  upsertedIds: {},
  insertedIds: {
    '0': 10,
    '1': 11,
    '3': 12,
    '4': 13,
    '6': 14
  }
}
Write Errors: [
  WriteError {
    err: {
      index: 2,
      code: 11000,
      errInfo: undefined,
      errmsg: 'E11000 duplicate key error collection: sample_mflix.movies index: _id_ dup key: { _id: 11 }'
    }
  },
  WriteError {
    err: {
      index: 5,
      code: 11000,
      errInfo: undefined,
      errmsg: 'E11000 duplicate key error collection: sample_mflix.movies index: _id_ dup key: { _id: 13 }'
    }
  }
]
