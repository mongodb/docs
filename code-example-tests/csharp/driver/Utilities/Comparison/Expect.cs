namespace Utilities.Comparison;

public static class Expect
{
    public static IBuilder That(object? actual)
    {
        if (actual is string actualString && PathUtilities.LooksLikeFilePath(actualString))
        {
            if (File.Exists(actualString))
            {
                return new FileValidationBuilder(actualString);
            }

            return new FileValidationBuilder(null);
        }

        return new ExpectBuilder(actual);
    }
}