const query = { name: 'Deli Llama' };
const update = { $set: { name: 'Deli Llama', address: '3 Nassau St' } };
const options = { upsert: true };
await myColl.updateOne(query, update, options);
