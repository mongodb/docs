const { ComparisonError } = require('./errorReporting');

/**
 * Analyzes unordered array comparison failures to provide detailed error reporting.
 * This function finds the best match for each expected element and reports specific
 * differences, making it much easier for technical writers to debug mismatches.
 *
 * @param {Array} expected - Expected array elements
 * @param {Array} actual - Actual array elements
 * @param {Function} compareElementFn - Function that returns detailed comparison result
 * @param {string} path - Current path in the data structure
 * @returns {Object} Detailed analysis with matches and errors
 */
function analyzeUnorderedMismatch(expected, actual, compareElementFn, path) {
  // Track results for each expected element
  const allMatches = [];
  const usedActual = new Set();

  // For each expected element, find its best match in actual
  for (let expIdx = 0; expIdx < expected.length; expIdx++) {
    let bestMatch = null;

    for (let actIdx = 0; actIdx < actual.length; actIdx++) {
      const elemPath = `${path}[${expIdx}]`;

      // Compare this expected element with this actual element
      const comparisonResult = compareElementFn(
        expected[expIdx],
        actual[actIdx],
        elemPath
      );

      const match = {
        expectedIdx: expIdx,
        actualIdx: actIdx,
        isMatch: comparisonResult.isMatch,
        errors: comparisonResult.errors || [],
        errorCount: (comparisonResult.errors || []).length,
      };

      // Perfect match - use this and mark actual as used
      if (comparisonResult.isMatch) {
        bestMatch = match;
        usedActual.add(actIdx);
        break;
      }

      // Track best (fewest errors) non-perfect match
      if (bestMatch === null || match.errorCount < bestMatch.errorCount) {
        bestMatch = match;
      }
    }

    if (bestMatch !== null) {
      allMatches.push(bestMatch);
    }
  }

  // Count how many perfect matches we found
  const perfectMatches = allMatches.filter((m) => m.isMatch).length;
  const failedCount = expected.length - perfectMatches;

  return {
    allMatches,
    perfectMatches,
    failedCount,
    totalExpected: expected.length,
  };
}

/**
 * Builds detailed error messages from unordered array analysis.
 * Creates a comprehensive report showing which elements matched and which didn't,
 * with specific field-level differences for failed matches.
 *
 * @param {Object} analysis - Result from analyzeUnorderedMismatch
 * @param {Array} expected - Expected array
 * @param {Array} actual - Actual array
 * @param {string} path - Path in data structure
 * @returns {Array<ComparisonError>} Array of detailed comparison errors
 */
function buildUnorderedArrayErrors(analysis, expected, actual, path) {
  const errors = [];

  // Add summary header
  if (analysis.failedCount === analysis.totalExpected) {
    errors.push(
      new ComparisonError(
        path,
        expected,
        actual,
        `No matching arrangement found for ${analysis.totalExpected} elements in unordered comparison`
      )
    );
  } else {
    errors.push(
      new ComparisonError(
        path,
        expected,
        actual,
        `No matching arrangement found: ${analysis.failedCount} of ${analysis.totalExpected} elements don't match in any arrangement`
      )
    );
  }

  // Add detailed analysis for each expected element
  for (const match of analysis.allMatches) {
    if (match.isMatch) {
      // Element matched perfectly - show success marker
      errors.push(
        new ComparisonError(
          `${path}[${match.expectedIdx}]`,
          null,
          null,
          `matches actual[${match.actualIdx}] ✓`
        )
      );
    } else {
      // Element didn't match - show closest match and differences
      const errorCountMsg =
        match.errorCount === 1
          ? '1 mismatch'
          : `${match.errorCount} mismatches`;

      errors.push(
        new ComparisonError(
          `${path}[${match.expectedIdx}]`,
          expected[match.expectedIdx],
          actual[match.actualIdx],
          `closest to actual[${match.actualIdx}] (${errorCountMsg}):`
        )
      );

      // Add the field-level errors, limiting to first 10 to avoid overwhelming output
      const maxErrors = 10;
      for (let i = 0; i < Math.min(match.errors.length, maxErrors); i++) {
        errors.push(match.errors[i]);
      }

      // If there are more errors, indicate how many were omitted
      if (match.errors.length > maxErrors) {
        const remaining = match.errors.length - maxErrors;
        errors.push(
          new ComparisonError(
            `${path}[${match.expectedIdx}]`,
            null,
            null,
            `... and ${remaining} more difference${remaining === 1 ? '' : 's'}`
          )
        );
      }
    }
  }

  return errors;
}

module.exports = {
  analyzeUnorderedMismatch,
  buildUnorderedArrayErrors,
};

