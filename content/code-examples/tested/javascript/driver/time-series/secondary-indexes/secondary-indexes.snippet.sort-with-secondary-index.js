const matchStage = {
  $match: { timestamp: { $gte: new Date('2022-01-15T00:00:00.000Z') } },
};
const sortStage = { $sort: { timestamp: 1 } };

const pipeline = [matchStage, sortStage];

const result = await collection.aggregate(pipeline).toArray();
