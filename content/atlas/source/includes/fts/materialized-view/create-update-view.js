const { MongoClient } = require('mongodb');
const schedule = require('node-schedule');

// Function to update the materialized view
async function updateMonthlyPhoneTransactions(client, collection) {
    const database = client.db('sample_supplies');
    const monthlyPhoneTransactions = database.collection('monthlyPhoneTransactions');
    
    // Create the aggregation pipeline
    const pipeline = [
        { $match: { purchaseMethod: 'Phone' } },
        { $unwind: { path: '$items' } },
        { 
            $group: {
                _id: { 
                    $dateToString: {
                        format: '%Y-%m',
                        date: '$saleDate'
                    }
                },
                sales_quantity: { $sum: '$items.quantity' },
                sales_price: { $sum: '$items.price' }
            }
        },
        { $set: { sales_price: { $toDouble: '$sales_price' } } }
    ];
    
    // Execute the aggregation
    const cursor = collection.aggregate(pipeline);
    
    // Process and save the results to monthlyPhoneTransactions
    for await (const doc of cursor) {
        // For each result, upsert into the materialized view
        await monthlyPhoneTransactions.replaceOne(
            { _id: doc._id },
            doc,
            { upsert: true }
        );
    }
}

async function main() {
    // Connect to MongoDB
    const uri = '<connection-string>';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const database = client.db('sample_supplies');
        const sales = database.collection('sales');
        const purchaseOrders = database.collection('purchaseOrders');
        
        // Update immediately on startup
        await updateMonthlyPhoneTransactions(client, sales);
        await updateMonthlyPhoneTransactions(client, purchaseOrders);
        console.log('Initial update completed. Materialized view is ready.');
        
        // Example of a simple scheduler that updates monthly
        // This schedules the job to run at midnight on the 1st of each month
        const job = schedule.scheduleJob('0 0 1 * *', async function() {
            try {
                await updateMonthlyPhoneTransactions(client, sales);
                await updateMonthlyPhoneTransactions(client, purchaseOrders);
                console.log(`Scheduled update completed at ${new Date().toISOString()}`);
            } catch (err) {
                console.error('Error during scheduled update:', err);
            }
        });
        
        console.log('Scheduler is running. Press Ctrl+C to exit.');
        
        // Keep the process running
        process.stdin.resume();
        
    } catch (err) {
        console.error('Error:', err);
    }
}

main().catch(console.error);
