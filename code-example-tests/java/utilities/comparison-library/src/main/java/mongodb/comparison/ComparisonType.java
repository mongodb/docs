package mongodb.comparison;

/**
 * Comparison types that users can specify.
 * The library will intelligently detect content types and choose appropriate strategies.
 */
public enum ComparisonType {
    /**
     * Strict ordered array/collection comparison where element position matters.
     * The library will automatically detect whether to use string-based or structural comparison
     * based on the content being compared.
     */
    ORDERED,

    /**
     * Unordered array/collection comparison where element position doesn't matter.
     * The library will automatically detect the best unordered comparison strategy
     * (set-based, hybrid, backtracking, etc.) based on content analysis.
     */
    UNORDERED
}
