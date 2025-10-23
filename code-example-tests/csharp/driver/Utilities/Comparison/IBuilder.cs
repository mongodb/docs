namespace Utilities.Comparison;

public interface IBuilder
{
    ComparisonResult ShouldMatch(object? expected);
    Task<ComparisonResult> ShouldMatchAsync(object? expected, CancellationToken cancellationToken = default);

    IBuilder WithOrderedSort();
    IBuilder WithUnorderedSort();
    IBuilder WithIgnoredFields(params string[] fieldNames);

    /// <summary>
    /// ShouldNotMatch is provided only for internal testing and should
    /// not be used in your unit tests. If you find yourself wanting to
    /// use this method, we strongly advise you to rewrite your test to
    /// check for a positive result.
    /// </summary>
    /// <param name="expected"></param>
    /// <returns></returns>
    ComparisonResult ShouldNotMatch(object? expected);


}