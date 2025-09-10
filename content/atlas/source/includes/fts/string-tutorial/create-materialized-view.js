import { MongoClient } from 'mongodb';

async function main() {
    // Connect to MongoDB
    const uri = '<connectionString>';
    const client = new MongoClient(uri);

    // Define the aggregation pipeline
    const pipeline = [
        { $project: {
            lastScrapedDate: { 
              $dateToString: { 
                format: '%Y-%m-%d',
                date: '$last_scraped' 
              } 
            },
            propertyName: '$name',
            propertyType: '$property_type',
            accomodatesNumber: {
              $toString: '$accomodates',
              $toString: '$maximum_nights'
            },
            maximumNumberOfNights: {
              $toString: '$maximum_nights'
            }
          }
       },
       { $merge: {
            into: 'airbnb_mat_view',
            whenMatched: 'replace'
          }
       }
    ]; 


try {
        await client.connect();
        const database = client.db('sample_airbnb');
        const collection = database.collection('listingsAndReviews');

        // Run the aggregation
        const cursor = collection.aggregate(pipeline);

        while (await cursor.hasNext()) {
            // Consume the cursor to execute the pipeline
            await cursor.next();
        }
        console.log('Materialized view created!');

        // Explicitly close the cursor after processing
        await cursor.close();
        console.log('Aggregation cursor closed.');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);