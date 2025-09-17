const { MongoClient } = require('mongodb');

async function createSchoolsData() {
  // Connection URI
  const uri = '<connection-string>';
  
  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    
    // Get the sample_mflix database
    const database = client.db('local_school_district');
    
    // Create the schools collection
    try {
      await database.createCollection('schools');
    } catch (err) {
      // Collection may already exist, which is fine
      console.log(`Note: ${err.message}`);
    }
    
    // Get the collection
    const collection = database.collection('schools');
    
    // Create and insert the first document - Springfield High
    const doc1 = {
      _id: 0,
      name: "Springfield High",
      mascot: "Pumas",
      teachers: [{
        first: "Jane",
        last: "Smith",
        classes: [{
          subject: "art of science",
          grade: "12th"
        },
        {
          subject: "applied science and practical science",
          grade: "9th"
        },
        {
          subject: "remedial math",
          grade: "12th"
        },
        {
          subject: "science",
          grade: "10th"
        }]
      },
      {
        first: "Bob",
        last: "Green",
        classes: [{
          subject: "science of art",
          grade: "11th"
        },
        {
          subject: "art art art",
          grade: "10th"
        }]
      }],
      clubs: {
        stem: [
          {
            club_name: "chess",
            description: "provides students opportunity to play the board game of chess informally and competitively in tournaments."
          },
          {
            club_name: "kaboom chemistry",
            description: "provides students opportunity to experiment with chemistry that fizzes and explodes."
          }
        ],
        arts: [
          {
            club_name: "anime",
            description: "provides students an opportunity to discuss, show, and collaborate on anime and broaden their Japanese cultural understanding."
          },
          {
            club_name: "visual arts",
            description: "provides students an opportunity to train, experiment, and prepare for internships and jobs as photographers, illustrators, graphic designers, and more."
          }
        ]
      }
    };
    
    await collection.insertOne(doc1);
    
    // Create and insert the second document - Evergreen High
    const doc2 = {
      _id: 1,
      name: "Evergreen High",
      mascot: "Jaguars",
      teachers: [{
        first: "Jane",
        last: "Earwhacker",
        classes: [{
          subject: "art",
          grade: "9th"
        },
        {
          subject: "science",
          grade: "12th"
        }]
      },
      {
        first: "John",
        last: "Smith",
        classes: [{
          subject: "math",
          grade: "12th"
        },
        {
          subject: "art",
          grade: "10th"
        }]
      }],
      clubs: {
        sports: [
          {
            club_name: "archery",
            description: "provides students an opportunity to practice and hone the skill of using a bow to shoot arrows in a fun and safe environment."
          },
          {
            club_name: "ultimate frisbee",
            description: "provides students an opportunity to play frisbee and learn the basics of holding the disc and complete passes."
          }
        ],
        stem: [
          {
            club_name: "zapped",
            description: "provides students an opportunity to make exciting gadgets and explore electricity."
          },
          {
            club_name: "loose in the chem lab",
            description: "provides students an opportunity to put the scientific method to the test and get elbow deep in chemistry."
          }
        ]
      }
    };
    
    await collection.insertOne(doc2);
    
    // Create and insert the third document - Lincoln High
    const doc3 = {
      _id: 2,
      name: "Lincoln High",
      mascot: "Sharks",
      teachers: [{
        first: "Jane",
        last: "Smith",
        classes: [{
          subject: "science",
          grade: "9th"
        },
        {
          subject: "math",
          grade: "12th"
        }]
      },
      {
        first: "John",
        last: "Redman",
        classes: [{
          subject: "art",
          grade: "12th"
        }]
      }],
      clubs: {
        arts: [
          {
            club_name: "ceramics",
            description: "provides students an opportunity to acquire knowledge of form, volume, and space relationships by constructing hand-built and wheel-thrown forms of clay."
          },
          {
            club_name: "digital art",
            description: "provides students an opportunity to learn about design for entertainment, 3D animation, technical art, or 3D modeling."
          }
        ],
        sports: [
          {
            club_name: "dodgeball",
            description: "provides students an opportunity to play dodgeball by throwing balls to eliminate the members of the opposing team while avoiding being hit themselves."
          },
          {
            club_name: "martial arts",
            description: "provides students an opportunity to learn self-defense or combat that utilize physical skill and coordination without weapons."
          }
        ]
      }
    };
    
    await collection.insertOne(doc3);
    
    console.log('Schools collection successfully created and populated.');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the function and handle any errors
createSchoolsData().catch(console.error);
