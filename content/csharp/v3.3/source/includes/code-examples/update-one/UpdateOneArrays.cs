using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using WriteData.Models;

namespace CSharpExamples.WriteData;

public static class UpdateOneArrays
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Setup()
    {
        // This allows automapping of the camelCase database fields to our models. 
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establish the connection to MongoDB and get the restaurants database
        var mongoClient = new MongoClient(_mongoConnectionString);
        var restaurantsDatabase = mongoClient.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDatabase.GetCollection<Restaurant>("restaurants");
    }

    public static UpdateResult UpdateOnePush()
    {
        // start-update-one-push
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .Push(restaurant => restaurant.Grades, new GradeEntry()
            {
                Date = DateTime.Now,
                Grade = "A",
                Score = 96
            });

        var result = _restaurantsCollection.UpdateOne(filter, update);

        return result;
        // end-update-one-push
    }

    public static async Task<UpdateResult> UpdateOnePushAsync()
    {
        // start-update-one-push-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .Push(restaurant => restaurant.Grades, new GradeEntry()
            {
                Date = DateTime.Now,
                Grade = "A",
                Score = 96
            });

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-push-async
    }

    public static UpdateResult UpdateOneAddToSet()
    {
        // start-update-one-addtoset
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var firstGradeEntry = _restaurantsCollection.Find(filter).FirstOrDefault().Grades[0];

        var update = Builders<Restaurant>.Update
            .AddToSet(restaurant => restaurant.Grades, firstGradeEntry);

        var result = _restaurantsCollection.UpdateOne(filter, update);

        return result;
        // end-update-one-addtoset
    }

    public static async Task<UpdateResult> UpdateOneAddToSetAsync()
    {
        // start-update-one-addtoset-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var firstGradeEntry = _restaurantsCollection.Find(filter).FirstOrDefault().Grades[0];

        var update = Builders<Restaurant>.Update
            .AddToSet(restaurant => restaurant.Grades, firstGradeEntry);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-addtoset-async
    }

    public static UpdateResult UpdateOnePushEach()
    {
        // start-update-one-pusheach
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.Now, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.Now, Grade = "B+", Score = 89,}
        };

        var scoreSort = Builders<GradeEntry>.Sort.Descending(g => g.Score);

        var update = Builders<Restaurant>.Update.PushEach(
            "Grades",
            newGrades,
            position: 0,
            sort: scoreSort);

        var result = _restaurantsCollection.UpdateOne(filter, update);

        return result;
        // end-update-one-pusheach
    }

    public static async Task<UpdateResult> UpdateOnePushEachAsync()
    {
        // start-update-one-pusheach-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.Now, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.Now, Grade = "B+", Score = 89,}
        };

        var scoreSort = Builders<GradeEntry>.Sort.Descending(g => g.Score);

        var update = Builders<Restaurant>.Update.PushEach(
            "Grades",
            newGrades,
            position: 0,
            sort: scoreSort);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-pusheach-async
    }

    public static UpdateResult UpdateOneAddToSetEach()
    {
        // start-update-one-addtoseteach
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var doc = _restaurantsCollection.Find(filter).FirstOrDefault();
        var firstGradeEntries = new List<GradeEntry> { doc.Grades[0], doc.Grades[1] };

        var update = Builders<Restaurant>.Update
            .AddToSetEach(restaurant => restaurant.Grades, firstGradeEntries);

        var result = _restaurantsCollection.UpdateOne(filter, update);

        return result;
        // end-update-one-addtoseteach
    }

    public static async Task<UpdateResult> UpdateOneAddToSetEachAsync()
    {
        // start-update-one-addtoseteach-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var doc = _restaurantsCollection.Find(filter).FirstOrDefault();
        var firstGradeEntries = new List<GradeEntry> { doc.Grades[0], doc.Grades[1] };

        var update = Builders<Restaurant>.Update
            .AddToSetEach(restaurant => restaurant.Grades, firstGradeEntries);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-addtoseteach-async
    }

    public static UpdateResult UpdateOnePopFirst()
    {
        // start-update-one-popfirst
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .PopFirst(restaurant => restaurant.Grades);

        var result = _restaurantsCollection.UpdateOne(filter, update);

        return result;
        // end-update-one-popfirst
    }

    public static async Task<UpdateResult> UpdateOnePopFirstAsync()
    {
        // start-update-one-popfirst-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .PopFirst(restaurant => restaurant.Grades);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-popfirst-async
    }

    public static UpdateResult UpdateOnePopLast()
    {
        // start-update-one-poplast
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .PopLast(restaurant => restaurant.Grades);

        var result = _restaurantsCollection.UpdateOne(filter, update);

        return result;
        // end-update-one-poplast
    }

    public static async Task<UpdateResult> UpdateOnePopLastAsync()
    {
        // start-update-one-poplast-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .PopLast(restaurant => restaurant.Grades);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-poplast-async
    }

    public static UpdateResult UpdateOnePull()
    {
        // start-update-one-pull
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add duplicate values to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        _restaurantsCollection.UpdateOne(filter, addUpdate);

        // Remove duplicates from Grades array
        var pullUpdate = Builders<Restaurant>.Update
            .Pull(restaurant => restaurant.Grades, newGrades[0]);

        var result = _restaurantsCollection.UpdateOne(filter, pullUpdate);

        return result;
        // end-update-one-pull
    }

    public static async Task<UpdateResult> UpdateOnePullAsync()
    {
        // start-update-one-pull-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add duplicate values to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        await _restaurantsCollection.UpdateOneAsync(filter, addUpdate);

        // Remove duplicates from Grades array
        var pullUpdate = Builders<Restaurant>.Update
            .Pull(restaurant => restaurant.Grades, newGrades[0]);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, pullUpdate);

        return result;
        // end-update-one-pull-async
    }

    public static UpdateResult UpdateOnePullAll()
    {
        // start-update-one-pullall
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add duplicate values to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95,},
            new GradeEntry { Date = DateTime.MinValue, Grade = "B", Score = 85 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "B", Score = 85,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        _restaurantsCollection.UpdateOne(filter, addUpdate);

        // Remove duplicates from Grades array
        var gradesToRemove = new List<GradeEntry> { newGrades[0], newGrades[2] };
        var pullUpdate = Builders<Restaurant>.Update
            .PullAll(restaurant => restaurant.Grades, gradesToRemove);

        var result = _restaurantsCollection.UpdateOne(filter, pullUpdate);

        return result;
        // end-update-one-pullall
    }

    public static async Task<UpdateResult> UpdateOnePullAllAsync()
    {
        // start-update-one-pullall-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add duplicate values to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95,},
            new GradeEntry { Date = DateTime.MinValue, Grade = "B", Score = 85 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "B", Score = 85,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        await _restaurantsCollection.UpdateOneAsync(filter, addUpdate);

        // Remove duplicates from Grades array
        var gradesToRemove = new List<GradeEntry> { newGrades[0], newGrades[2] };
        var pullUpdate = Builders<Restaurant>.Update
            .PullAll(restaurant => restaurant.Grades, gradesToRemove);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, pullUpdate);

        return result;
        // end-update-one-pullall-async
    }

    public static UpdateResult UpdateOnePullFilter()
    {
        // start-update-one-pullfilter
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add GradeEntry values with "Grade = F" to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 10 },
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 21,},
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 47 },
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 6,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        _restaurantsCollection.UpdateOne(filter, addUpdate);

        // Remove all "Grade = F" values from Grades array
        var pullUpdate = Builders<Restaurant>.Update
            .PullFilter(restaurant => restaurant.Grades, gradeEntry => gradeEntry.Grade == "F");

        var result = _restaurantsCollection.UpdateOne(filter, pullUpdate);

        return result;
        // end-update-one-pullfilter
    }

    public static async Task<UpdateResult> UpdateOnePullFilterAsync()
    {
        // start-update-one-pullfilter-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add GradeEntry values with "Grade = F" to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 10 },
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 21,},
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 47 },
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 6,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        await _restaurantsCollection.UpdateOneAsync(filter, addUpdate);

        // Remove all "Grade = F" values from Grades array
        var pullUpdate = Builders<Restaurant>.Update
            .PullFilter(restaurant => restaurant.Grades, gradeEntry => gradeEntry.Grade == "F");

        var result = await _restaurantsCollection.UpdateOneAsync(filter, pullUpdate);

        return result;
        // end-update-one-pullfilter-async
    }

    public static UpdateResult UpdateOnePositional()
    {
        // start-update-one-positional
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli") &
                    Builders<Restaurant>.Filter.Eq("grades.grade", "A");

        // Set Score = 100 in first GradeEntry where Grade = "A"
        var update = Builders<Restaurant>.Update
            .Set("grades.$.score", 100);

        var result = _restaurantsCollection.UpdateOne(filter, update);

        return result;
        // end-update-one-positional
    }

    public static UpdateResult UpdateOnePositionalLinq()
    {
        // start-update-one-positional-linq
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli") &
                    Builders<Restaurant>.Filter.Eq("grades.grade", "A");

        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.FirstMatchingElement().Score, 100);

        var result = _restaurantsCollection.UpdateOne(filter, update);
        return result;
        // end-update-one-positional-linq
    }

    public static async Task<UpdateResult> UpdateOnePositionalAsync()
    {
        // start-update-one-positional-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli") &
                    Builders<Restaurant>.Filter.Eq("grades.grade", "A");

        // Set Score = 100 in first GradeEntry where Grade = "A"
        var update = Builders<Restaurant>.Update
            .Set("grades.$.score", 100);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-positional-async
    }

    public static async Task<UpdateResult> UpdateOnePositionalLinqAsync()
    {
        // start-update-one-positional-linq-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli") &
                    Builders<Restaurant>.Filter.Eq("grades.grade", "A");

        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.FirstMatchingElement().Score, 100);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-positional-linq-async
    }

    public static UpdateResult UpdateOneAllPositional()
    {
        // start-update-one-allpositional
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Set Score = 100 in all GradeEntry objects
        var update = Builders<Restaurant>.Update
            .Set("grades.$[].score", 100);

        var result = _restaurantsCollection.UpdateOne(filter, update);

        return result;
        // end-update-one-allpositional
    }

    public static UpdateResult UpdateOneAllPositionalLinq()
    {
        // start-update-one-allpositional-linq
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Set Score = 100 in all GradeEntry objects
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.AllElements().Score, 100);

        var result = _restaurantsCollection.UpdateOne(filter, update);

        return result;
        // end-update-one-allpositional-linq
    }

    public static async Task<UpdateResult> UpdateOneAllPositionalAsync()
    {
        // start-update-one-allpositional-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Set Score = 100 in all GradeEntry objects
        var update = Builders<Restaurant>.Update
            .Set("grades.$[].score", 100);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-allpositional-async
    }

    public static async Task<UpdateResult> UpdateOneAllPositionalLinqAsync()
    {
        // start-update-one-allpositional-linq-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Set Score = 100 in all GradeEntry objects
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.AllElements().Score, 100);

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-allpositional-linq-async
    }

    public static UpdateResult UpdateOneFilteredPositional()
    {
        // start-update-one-filteredpositional
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var arrayFilters = new List<ArrayFilterDefinition>
        {
            new BsonDocumentArrayFilterDefinition<Restaurant>(
                new BsonDocument
                {
                    { "gradeEntry.score", new BsonDocument { { "$gte", 94} } }
                })
        };

        // Set Grade = "A" in all GradeEntry objects where Score >= 94
        var update = Builders<Restaurant>.Update
            .Set("grades.$[gradeEntry].grade", "A");

        var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters };
        var result = _restaurantsCollection.UpdateOne(filter, update, updateOptions);

        return result;
        // end-update-one-filteredpositional
    }

    public static UpdateResult UpdateOneFilteredPositionalLinq()
    {
        // start-update-one-filteredpositional-linq
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var arrayFilters = new List<ArrayFilterDefinition>
        {
            new BsonDocumentArrayFilterDefinition<Restaurant>(
                new BsonDocument
                {
                    { "gradeEntry.score", new BsonDocument { { "$gte", 94} } }
                })
        };

        // Set Grade = "A" in all GradeEntry objects where Score >= 94
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.AllMatchingElements("gradeEntry").Grade, "A");

        var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters };
        var result = _restaurantsCollection.UpdateOne(filter, update, updateOptions);

        return result;
        // end-update-one-filteredpositional-linq
    }

    public static async Task<UpdateResult> UpdateOneFilteredPositionalAsync()
    {
        // start-update-one-filteredpositional-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var arrayFilters = new List<ArrayFilterDefinition>
        {
            new BsonDocumentArrayFilterDefinition<Restaurant>(
                new BsonDocument
                {
                    { "gradeEntry.score", new BsonDocument { { "$gte", 94} } }
                })
        };

        // Set Grade = "A" in all GradeEntry objects where Score >= 94
        var update = Builders<Restaurant>.Update
            .Set("grades.$[gradeEntry].grade", "A");

        var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters };
        var result = await _restaurantsCollection.UpdateOneAsync(filter, update, updateOptions);

        return result;
        // end-update-one-filteredpositional-async
    }

    public static async Task<UpdateResult> UpdateOneFilteredPositionalLinqAsync()
    {
        // start-update-one-filteredpositional-linq-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var arrayFilters = new List<ArrayFilterDefinition>
        {
            new BsonDocumentArrayFilterDefinition<Restaurant>(
                new BsonDocument
                {
                    { "gradeEntry.score", new BsonDocument { { "$gte", 94} } }
                })
        };

        // Set Grade = "A" in all GradeEntry objects where Score >= 94
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.AllMatchingElements("gradeEntry").Grade, "A");

        var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters };
        var result = await _restaurantsCollection.UpdateOneAsync(filter, update, updateOptions);

        return result;
        // end-update-one-filteredpositional-linq-async
    }
}