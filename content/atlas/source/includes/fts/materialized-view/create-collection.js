const { MongoClient } = require("mongodb");
const assert = require("assert");

async function run() {
  // Connect to your MongoDB deployment
  const client = new MongoClient("<connection-string>");

  try {
    await client.connect();
    
    // Set namespace
    const database = client.db("sample_supplies");
    const collection = database.collection("purchaseOrders");
    
    // Create the documents
    const purchaseOrder1 = {
      saleDate: new Date("2018-01-23T21:06:49.506Z"),
      items: [
        {
          name: 'printer paper',
          tags: ['office', 'stationary'],
          price: 40.01,
          quantity: 2
        },
        {
          name: 'notepad',
          tags: ['office', 'writing', 'school'],
          price: 35.29,
          quantity: 2
        },
        {
          name: 'pens',
          tags: ['writing', 'office', 'school', 'stationary'],
          price: 56.12,
          quantity: 5
        },
        {
          name: 'backpack',
          tags: ['school', 'travel', 'kids'],
          price: 77.71,
          quantity: 2
        },
        {
          name: 'notepad',
          tags: ['office', 'writing', 'school'],
          price: 18.47,
          quantity: 2
        },
        {
          name: 'envelopes',
          tags: ['stationary', 'office', 'general'],
          price: 19.95,
          quantity: 8
        },
        {
          name: 'envelopes',
          tags: ['stationary', 'office', 'general'],
          price: 8.08,
          quantity: 3
        },
        {
          name: 'binder',
          tags: ['school', 'general', 'organization'],
          price: 14.16,
          quantity: 3
        }
      ],
      storeLocation: "Denver",
      customer: {
        gender: "M",
        age: 42,
        email: "cauho@witwuta.sv",
        satisfaction: 4
      },
      couponUsed: true,
      purchaseMethod: "Phone"
    };
    
    const purchaseOrder2 = {
      saleDate: new Date("2018-01-25T10:01:02.918Z"),
      items: [
        {
          name: 'envelopes',
          tags: ['stationary', 'office', 'general'],
          price: 8.05,
          quantity: 10
        },
        {
          name: 'binder',
          tags: ['school', 'general', 'organization'],
          price: 28.31,
          quantity: 9
        },
        {
          name: 'notepad',
          tags: ['office', 'writing', 'school'],
          price: 20.95,
          quantity: 3
        },
        {
          name: 'laptop',
          tags: ['electronics', 'school', 'office'],
          price: 866.5,
          quantity: 4
        },
        {
          name: 'notepad',
          tags: ['office', 'writing', 'school'],
          price: 33.09,
          quantity: 4
        },
        {
          name: 'printer paper',
          tags: ['office', 'stationary'],
          price: 37.55,
          quantity: 1
        },
        {
          name: 'backpack',
          tags: ['school', 'travel', 'kids'],
          price: 83.28,
          quantity: 2
        },
        {
          name: 'pens',
          tags: ['writing', 'office', 'school', 'stationary'],
          price: 42.9,
          quantity: 4
        },
        {
          name: 'envelopes',
          tags: ['stationary', 'office', 'general'],
          price: 16.68,
          quantity: 2
        }
      ],
      storeLocation: "Seattle",
      customer: {
        gender: "M",
        age: 50,
        email: "keecade@hem.uy",
        satisfaction: 5
      },
      couponUsed: false,
      purchaseMethod: "Phone"
    };
    
    // Insert the documents
    await collection.insertMany([purchaseOrder1, purchaseOrder2]);
    
    console.log("Successfully inserted purchase order documents.");
    
    // Query the new collection
    const cursor = collection.find().sort({ saleDate: -1 });
    
    console.log("\nQuery results:");
    await cursor.forEach(doc => console.log(doc));
    
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
