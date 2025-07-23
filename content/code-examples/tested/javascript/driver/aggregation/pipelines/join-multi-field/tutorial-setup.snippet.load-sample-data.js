const products = aggDB.collection('products');
const orders = aggDB.collection('orders');

await products.insertMany([
  {
    name: 'Asus Laptop',
    variation: 'Ultra HD',
    category: 'ELECTRONICS',
    description: 'Great for watching movies',
  },
  {
    name: 'Asus Laptop',
    variation: 'Standard Display',
    category: 'ELECTRONICS',
    description: 'Good value laptop for students',
  },
  {
    name: 'The Day Of The Triffids',
    variation: '1st Edition',
    category: 'BOOKS',
    description: 'Classic post-apocalyptic novel',
  },
  {
    name: 'The Day Of The Triffids',
    variation: '2nd Edition',
    category: 'BOOKS',
    description: 'Classic post-apocalyptic novel',
  },
  {
    name: 'Morphy Richards Food Mixer',
    variation: 'Deluxe',
    category: 'KITCHENWARE',
    description: 'Luxury mixer turning good cakes into great',
  },
]);

await orders.insertMany([
  {
    customer_id: 'elise_smith@myemail.com',
    orderdate: new Date('2020-05-30T08:35:52Z'),
    product_name: 'Asus Laptop',
    product_variation: 'Standard Display',
    value: 431.43,
  },
  {
    customer_id: 'tj@wheresmyemail.com',
    orderdate: new Date('2019-05-28T19:13:32Z'),
    product_name: 'The Day Of The Triffids',
    product_variation: '2nd Edition',
    value: 5.01,
  },
  {
    customer_id: 'oranieri@warmmail.com',
    orderdate: new Date('2020-01-01T08:25:37Z'),
    product_name: 'Morphy Richards Food Mixer',
    product_variation: 'Deluxe',
    value: 63.13,
  },
  {
    customer_id: 'jjones@tepidmail.com',
    orderdate: new Date('2020-12-26T08:55:46Z'),
    product_name: 'Asus Laptop',
    product_variation: 'Standard Display',
    value: 429.65,
  },
]);
