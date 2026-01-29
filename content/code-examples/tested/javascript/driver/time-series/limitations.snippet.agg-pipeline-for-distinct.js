await collection.createIndex({ 'meta.project': 1, 'meta.type': 1 });

const pipeline = [
  { $match: { 'meta.project': 10 } },
  { $group: { _id: '$meta.type' } },
];

const result = await collection.aggregate(pipeline).toArray();
