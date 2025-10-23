using System.Runtime.InteropServices.JavaScript;

namespace Utilities.Comparison;

public class ComparisonResult
{
    public bool IsSuccess { get; set; }

    public ComparisonError? Error { get; set; }

}

public class ComparisonSuccess : ComparisonResult
{
    public ComparisonSuccess() : base()
    {
        IsSuccess = true;
    }
}

public class ComparisonError : ComparisonResult
{
    public string Path { get; }
    public string Expected { get; }
    public string Actual { get; }
    public string? Message { get; }

    public ComparisonError(string path, string expected, string actual, string? message)
    {
        Path = path;
        Expected = expected;
        Actual = actual;
        Message = message;
    }

    public ComparisonError(string? message) : this("", "", "", message)
    {
    }
}