const { MongoClient } = require("mongodb");

const agg = [
  {
    '$search': {
      'index': 'monthlySalesIndex',
      'range': {
        'gt': 10000,
        'path': ['sales_price']
      }
    }
  },
  {
    '$count': 'months_w_over_10000'
  }
];

async function run() {
  const client = new MongoClient("<connection-string>");
  
  try {
    await client.connect();
    const coll = client.db("sample_supplies").collection("monthlyPhoneTransactions");
    const cursor = await coll.aggregate(agg);
    const results = await cursor.toArray();
    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
