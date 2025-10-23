namespace Utilities.Comparison;

public class ComparisonException : Exception
{
    public ComparisonError? Details; // Property to hold the custom object

    // Default constructor
    public ComparisonException() : base() { }

    // Constructor with a message
    public ComparisonException(string message) : base(message) { }

    // Constructor with a message and the custom object
    public ComparisonException(string message, ComparisonError? details) : base(message)
    {
        Details = details;
    }
}