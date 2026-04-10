public class Author
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
}

public class Book
{
    public ObjectId Id { get; set; }
    public string Title { get; set; } = null!;

    // Store reference to Author by storing the Author's Id
    public ObjectId AuthorId { get; set; }
}
