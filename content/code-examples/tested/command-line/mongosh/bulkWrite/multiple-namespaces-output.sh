{
  cursor: {
    id: Long('0'),
    firstBatch: [
      { ok: 1, idx: 0, n: 1 },
      { ok: 1, idx: 1, n: 1 },
      { ok: 1, idx: 2, n: 1, nModified: 1 },
      { ok: 1, idx: 3, n: 1 },
      { ok: 1, idx: 4, n: 1, nModified: 1 },
      { ok: 1, idx: 5, n: 1 },
      { ok: 1, idx: 6, n: 2 }
    ],
    ns: 'admin.$cmd.bulkWrite'
  },
  nErrors: 0,
  nInserted: 2,
  nMatched: 2,
  nModified: 2,
  nUpserted: 0,
  nDeleted: 4,
  ok: 1
}