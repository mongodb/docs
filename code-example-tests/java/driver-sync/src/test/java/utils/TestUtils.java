package utils;

import com.mongodb.assertions.Assertions;
import org.bson.Document;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestUtils {

    /**
     * Reads the contents of the provided file and converts them into a list of MongoDB Documents.
     * Assumes each line in the file contains valid JSON for a single Document.
     *
     * @param filePath Path to the file to read
     * @return List of Documents read from the file
     */
    public static List<Document> loadDocumentsFromFile(Path filePath) {
        if (!Files.exists(filePath)) {
            throw new RuntimeException(
                    String.format("The file at '%s' does not exist. Please provide a valid file path.", filePath));
        }
        if (!Files.isReadable(filePath)) {
            throw new RuntimeException(
                    String.format("The file at '%s' is not readable. Ensure proper permissions.", filePath));
        }
        try {
            List<String> lines = Files.readAllLines(filePath);
            List<Document> documents = new ArrayList<>();

            for (String line : lines) {
                if (!line.trim().isEmpty()) {
                    documents.add(Document.parse(line));
                }
            }
            return documents;
        } catch (IOException e) {
            throw new RuntimeException(String.format(
                    "Failed to read the file at '%s'. Ensure the file exists, is readable, and contains valid JSON data.",
                    filePath), e);
        }
    }

    /**
     * Normalizes a string by trimming it and replacing multiple whitespaces with a single space.
     *
     * @param input The string to normalize
     * @return Normalized string
     */
    private static String normalizeWhitespace(String input) {
        return input.trim().replaceAll("\\s+", " ");
    }

    /**
     * Converts a string to lowercase for case-insensitive comparisons.
     *
     * @param input The string to normalize to lowercase
     * @return Lowercase string
     */
    private static String normalizeCase(String input) {
        return input.toLowerCase(Locale.ROOT);
    }

    /**
     * Normalizes a set of strings for unordered comparison.
     *
     * @param lines List of strings to normalize
     * @return Normalized set of strings
     */
    private static Set<String> normalizeLinesToSet(List<String> lines) {
        return lines.stream()
                .map(line -> normalizeWhitespace(normalizeCase(line)))
                .collect(Collectors.toSet());
    }

    /**
     * Validates that the actual results match the expected results, ignoring order, whitespace,
     * and case differences. Handles serialization internally.
     *
     * @param expectedDocs List of expected MongoDB Documents
     * @param actualDocs   List of actual MongoDB Documents
     */
    public static void validateUnorderedResults(List<Document> expectedDocs, List<Document> actualDocs) {
        // Serialize both lists to JSON string representations
        List<String> expectedStrings = expectedDocs.stream()
                .map(Document::toJson)
                .collect(Collectors.toList());
        List<String> actualStrings = actualDocs.stream()
                .map(Document::toJson)
                .collect(Collectors.toList());

        // Normalize the results into sets
        Set<String> expectedSet = normalizeLinesToSet(expectedStrings);
        Set<String> actualSet = normalizeLinesToSet(actualStrings);

        // Find differences between the sets
        Set<String> missingLines = new HashSet<>(expectedSet);
        missingLines.removeAll(actualSet);

        Set<String> extraLines = new HashSet<>(actualSet);
        extraLines.removeAll(expectedSet);

        // JUnit-style assertions for validation
        assertTrue(missingLines.isEmpty(), "Missing lines:\n" + String.join("\n", missingLines));
        assertTrue(extraLines.isEmpty(), "Extra lines:\n" + String.join("\n", extraLines));

        System.out.printf("Test completed successfully.%nExpected total lines: %d%nActual total lines: %d%n",
                expectedSet.size(), actualSet.size());
    }
}
