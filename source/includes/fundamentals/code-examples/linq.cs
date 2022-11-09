
// start-restaurant-model
public class Restaurant
{
    public ObjectId Id { get; set; }

    public string Name { get; set; }

    [BsonElement("restaurant_id")]
    public string RestaurantId { get; set; }

    public string Cuisine { get; set; }

    public object Address { get; set; }

    public string Borough { get; set; }

    public List<object> Grades { get; set; }
}
// end-restaurant-model

// start-review-model

public class Review
{
    public ObjectId Id { get; set; }

    [BsonElement("restaurant_name")]
    public string RestaurantName { get; set; }

    public string Reviewer { get; set; }

    [BsonElement("review_text")]
    public string ReviewText { get; set; }
}

// end-review-model