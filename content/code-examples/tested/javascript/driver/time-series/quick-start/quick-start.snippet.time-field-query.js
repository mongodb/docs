const startTime = new Date(2021, 11, 18, 15, 50, 0, 0);
const endTime = new Date(2021, 11, 18, 15, 56, 0, 0);

const query = {
  $and: [{ date: { $gte: startTime } }, { date: { $lte: endTime } }],
};

const timefieldResults = await stocks.find(query, {
  projection: { _id: 0 },
});
