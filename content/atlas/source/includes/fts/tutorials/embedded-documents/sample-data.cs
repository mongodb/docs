using System;
using MongoDB.Bson;
using MongoDB.Driver;

namespace SynonymsTutorial
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                // Connection string to your MongoDB cluster
                string connectionString = "<connection-string>";
                
                // Create a MongoDB client
                var client = new MongoClient(connectionString);
                
                // Get the sample_mflix database
                var database = client.GetDatabase("sample_mflix");
                
                // Create the schools collection
                try
                {
                    database.CreateCollection("schools");
                }
                catch (MongoCommandException ex)
                {
                    // Collection may already exist, which is fine
                    Console.WriteLine($"Note: {ex.Message}");
                }
                
                var collection = database.GetCollection<BsonDocument>("schools");
                
                // Create and insert the first document - Springfield High
                var doc1 = new BsonDocument
                {
                    { "_id", 0 },
                    { "name", "Springfield High" },
                    { "mascot", "Pumas" },
                    { "teachers", new BsonArray
                        {
                            new BsonDocument
                            {
                                { "first", "Jane" },
                                { "last", "Smith" },
                                { "classes", new BsonArray
                                    {
                                        new BsonDocument { { "subject", "art of science" }, { "grade", "12th" } },
                                        new BsonDocument { { "subject", "applied science and practical science" }, { "grade", "9th" } },
                                        new BsonDocument { { "subject", "remedial math" }, { "grade", "12th" } },
                                        new BsonDocument { { "subject", "science" }, { "grade", "10th" } }
                                    }
                                }
                            },
                            new BsonDocument
                            {
                                { "first", "Bob" },
                                { "last", "Green" },
                                { "classes", new BsonArray
                                    {
                                        new BsonDocument { { "subject", "science of art" }, { "grade", "11th" } },
                                        new BsonDocument { { "subject", "art art art" }, { "grade", "10th" } }
                                    }
                                }
                            }
                        }
                    },
                    { "clubs", new BsonDocument
                        {
                            { "stem", new BsonArray
                                {
                                    new BsonDocument
                                    {
                                        { "club_name", "chess" },
                                        { "description", "provides students opportunity to play the board game of chess informally and competitively in tournaments." }
                                    },
                                    new BsonDocument
                                    {
                                        { "club_name", "kaboom chemistry" },
                                        { "description", "provides students opportunity to experiment with chemistry that fizzes and explodes." }
                                    }
                                }
                            },
                            { "arts", new BsonArray
                                {
                                    new BsonDocument
                                    {
                                        { "club_name", "anime" },
                                        { "description", "provides students an opportunity to discuss, show, and collaborate on anime and broaden their Japanese cultural understanding." }
                                    },
                                    new BsonDocument
                                    {
                                        { "club_name", "visual arts" },
                                        { "description", "provides students an opportunity to train, experiment, and prepare for internships and jobs as photographers, illustrators, graphic designers, and more." }
                                    }
                                }
                            }
                        }
                    }
                };
                
                collection.InsertOne(doc1);
                
                // Create and insert the second document - Evergreen High
                var doc2 = new BsonDocument
                {
                    { "_id", 1 },
                    { "name", "Evergreen High" },
                    { "mascot", "Jaguars" },
                    { "teachers", new BsonArray
                        {
                            new BsonDocument
                            {
                                { "first", "Jane" },
                                { "last", "Earwhacker" },
                                { "classes", new BsonArray
                                    {
                                        new BsonDocument { { "subject", "art" }, { "grade", "9th" } },
                                        new BsonDocument { { "subject", "science" }, { "grade", "12th" } }
                                    }
                                }
                            },
                            new BsonDocument
                            {
                                { "first", "John" },
                                { "last", "Smith" },
                                { "classes", new BsonArray
                                    {
                                        new BsonDocument { { "subject", "math" }, { "grade", "12th" } },
                                        new BsonDocument { { "subject", "art" }, { "grade", "10th" } }
                                    }
                                }
                            }
                        }
                    },
                    { "clubs", new BsonDocument
                        {
                            { "sports", new BsonArray
                                {
                                    new BsonDocument
                                    {
                                        { "club_name", "archery" },
                                        { "description", "provides students an opportunity to practice and hone the skill of using a bow to shoot arrows in a fun and safe environment." }
                                    },
                                    new BsonDocument
                                    {
                                        { "club_name", "ultimate frisbee" },
                                        { "description", "provides students an opportunity to play frisbee and learn the basics of holding the disc and complete passes." }
                                    }
                                }
                            },
                            { "stem", new BsonArray
                                {
                                    new BsonDocument
                                    {
                                        { "club_name", "zapped" },
                                        { "description", "provides students an opportunity to make exciting gadgets and explore electricity." }
                                    },
                                    new BsonDocument
                                    {
                                        { "club_name", "loose in the chem lab" },
                                        { "description", "provides students an opportunity to put the scientific method to the test and get elbow deep in chemistry." }
                                    }
                                }
                            }
                        }
                    }
                };
                
                collection.InsertOne(doc2);
                
                // Create and insert the third document - Lincoln High
                var doc3 = new BsonDocument
                {
                    { "_id", 2 },
                    { "name", "Lincoln High" },
                    { "mascot", "Sharks" },
                    { "teachers", new BsonArray
                        {
                            new BsonDocument
                            {
                                { "first", "Jane" },
                                { "last", "Smith" },
                                { "classes", new BsonArray
                                    {
                                        new BsonDocument { { "subject", "science" }, { "grade", "9th" } },
                                        new BsonDocument { { "subject", "math" }, { "grade", "12th" } }
                                    }
                                }
                            },
                            new BsonDocument
                            {
                                { "first", "John" },
                                { "last", "Redman" },
                                { "classes", new BsonArray
                                    {
                                        new BsonDocument { { "subject", "art" }, { "grade", "12th" } }
                                    }
                                }
                            }
                        }
                    },
                    { "clubs", new BsonDocument
                        {
                            { "arts", new BsonArray
                                {
                                    new BsonDocument
                                    {
                                        { "club_name", "ceramics" },
                                        { "description", "provides students an opportunity to acquire knowledge of form, volume, and space relationships by constructing hand-built and wheel-thrown forms of clay." }
                                    },
                                    new BsonDocument
                                    {
                                        { "club_name", "digital art" },
                                        { "description", "provides students an opportunity to learn about design for entertainment, 3D animation, technical art, or 3D modeling." }
                                    }
                                }
                            },
                            { "sports", new BsonArray
                                {
                                    new BsonDocument
                                    {
                                        { "club_name", "dodgeball" },
                                        { "description", "provides students an opportunity to play dodgeball by throwing balls to eliminate the members of the opposing team while avoiding being hit themselves." }
                                    },
                                    new BsonDocument
                                    {
                                        { "club_name", "martial arts" },
                                        { "description", "provides students an opportunity to learn self-defense or combat that utilize physical skill and coordination without weapons." }
                                    }
                                }
                            }
                        }
                    }
                };
                
                collection.InsertOne(doc3);
                
                Console.WriteLine("Schools collection successfully created and populated.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                Environment.Exit(1);
            }
        }
    }
}
