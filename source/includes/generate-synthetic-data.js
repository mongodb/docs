// require the necessary libraries
const { faker } = require("@faker-js/faker");
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    // Connection URL
    const uri = "<YOUR-ATLAS-URI>";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("<DATABASE-NAME>").collection("<COLLECTION-NAME>");

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 5000; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            let newDay = {
                timestamp_day: faker.date.past(),
                cat: faker.lorem.word(),
                owner: {
                    email: faker.internet.email({firstName, lastName}),
                    firstName,
                    lastName,
                },
                events: [],
            };

            for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
                let newEvent = {
                    timestamp_event: faker.date.past(),
                    weight: randomIntFromInterval(14,16),
                }
                newDay.events.push(newEvent);
            }
            timeSeriesData.push(newDay);
        }
        await collection.insertMany(timeSeriesData);

        console.log("Database seeded with synthetic data! :)");
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();