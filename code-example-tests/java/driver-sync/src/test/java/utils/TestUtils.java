package utils;

import org.bson.Document;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class TestUtils {
    /**
     * Reads the contents of the provided file and converts them into a list of
     * MongoDB Documents. Assumes each line in the file contains valid JSON for a
     * single Document.
     *
     * @param filePath
     *            Path to the file to read
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
                documents.add(Document.parse(line));
            }

            return documents;
        } catch (IOException e) {
            throw new RuntimeException(String.format(
                    "Failed to read the file at '%s'. Ensure the file exists, is readable, and contains valid JSON data.",
                    filePath), e);
        }
    }
}
