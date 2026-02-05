package mongodb.comparison;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.Document;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Parses expected output files and normalizes them for comparison.
 * Handles various MongoDB and JSON formats found in test files.
 * Package-private - internal implementation detail for the Expect API.
 */
class ExpectedOutputParser {

    private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

    // Patterns for MongoDB-specific syntax normalization
    private static final Pattern UNQUOTED_KEY_PATTERN = Pattern.compile("([{,\\s])(\\w+):");
    private static final Pattern OBJECTID_PATTERN = Pattern.compile("ObjectId\\([\"']([^\"']*)[\"']\\)");
    private static final Pattern DATE_PATTERN = Pattern.compile("Date\\([\"']([^\"']*)[\"']\\)");
    private static final Pattern DOLLAR_DATE_PATTERN = Pattern.compile("\\{\\s*\"\\$date\"\\s*:\\s*\"([^\"]+)\"\\s*\\}");

    // Patterns for file processing
    private static final Pattern SINGLE_LINE_COMMENT = Pattern.compile("//.*$", Pattern.MULTILINE);
    private static final Pattern MULTI_LINE_COMMENT = Pattern.compile("/\\*.*?\\*/", Pattern.DOTALL);
    private static final Pattern EXTENDED_JSON_OBJECTID = Pattern.compile("\\{\\s*\"\\$oid\"\\s*:\\s*\"([^\"]+)\"\\s*\\}");
    private static final Pattern EXTENDED_JSON_NUMBERINT = Pattern.compile("\\{\\s*\"\\$numberInt\"\\s*:\\s*\"([^\"]+)\"\\s*\\}");
    private static final Pattern EXTENDED_JSON_NUMBERLONG = Pattern.compile("\\{\\s*\"\\$numberLong\"\\s*:\\s*\"([^\"]+)\"\\s*\\}");
    private static final Pattern EXTENDED_JSON_DATE_TIMESTAMP = Pattern.compile("\\{\\s*\"\\$date\"\\s*:\\s*\\{\\s*\"\\$numberLong\"\\s*:\\s*\"([^\"]+)\"\\s*\\}\\s*\\}");

    /**
     * File format enumeration for automatic detection.
     */
    public enum FileFormat {
        JSON,               // Single JSON document
        JSONL,              // JSON Lines format
        EXTENDED_JSON,      // MongoDB Extended JSON
        MIXED,              // Multiple formats in one file
        UNKNOWN
    }

    /**
     * Detect file format automatically based on content analysis.
     * Implementation for spec section 5.2
     */
    public static FileFormat detectFormat(Path filePath) throws IOException {
        if (!Files.exists(filePath)) {
            return FileFormat.UNKNOWN;
        }

        String content = readFileWithEncoding(filePath);
        return detectFormatFromContent(content);
    }

    /**
     * Detect file format from content string.
     */
    public static FileFormat detectFormatFromContent(String content) {
        content = content.trim();

        if (content.isEmpty()) {
            return FileFormat.UNKNOWN;
        }

        // Check for JSONL format FIRST (multiple JSON objects on separate lines)
        // This must come before Extended JSON check since JSONL files can contain Extended JSON
        if (isJsonLinesFormat(content)) {
            return FileFormat.JSONL;
        }

        // Check for Extended JSON patterns
        if (hasExtendedJsonPatterns(content)) {
            return FileFormat.EXTENDED_JSON;
        }

        // Check for mixed content (comments + JSON)
        if (hasMixedContent(content)) {
            return FileFormat.MIXED;
        }

        // Try to parse as standard JSON
        try {
            JSON_MAPPER.readTree(content);
            return FileFormat.JSON;
        } catch (Exception e) {
            // If standard JSON parsing fails, check if it might be JSON with single quotes
            if (hasSingleQuotes(content)) {
                return FileFormat.JSON; // Treat as JSON that needs quote normalization
            }
            // Check if content contains ellipsis patterns that need normalization
            // If so, treat as JSON that needs ellipsis normalization
            if (content.contains("...") && (content.trim().startsWith("{") || content.trim().startsWith("["))) {
                return FileFormat.JSON; // Treat as JSON with ellipsis patterns
            }
            return FileFormat.UNKNOWN;
        }
    }

    /**
     * Read file with automatic encoding detection.
     * Supports UTF-8, UTF-16, and ISO-8859-1.
     */
    private static String readFileWithEncoding(Path filePath) throws IOException {
        byte[] bytes = Files.readAllBytes(filePath);

        // Try UTF-8 first (most common)
        try {
            return new String(bytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            // Fall back to UTF-16 if UTF-8 fails
            try {
                return new String(bytes, StandardCharsets.UTF_16);
            } catch (Exception e2) {
                // Final fallback to ISO-8859-1
                return new String(bytes, StandardCharsets.ISO_8859_1);
            }
        }
    }

    /**
     * Check if content contains Extended JSON patterns.
     */
    private static boolean hasExtendedJsonPatterns(String content) {
        return content.contains("$oid") ||
               content.contains("$date") ||
               content.contains("$numberInt") ||
               content.contains("$numberLong") ||
               content.contains("$numberDecimal");
    }

    /**
    * Check if content is in JSON Lines format.
    * Handles bare ellipsis patterns in JSON lines AND multi-line JSON objects.
     */
    private static boolean isJsonLinesFormat(String content) {
        String[] lines = content.split("\n");
        if (lines.length <= 1) {
            return false;
        }

        // First try standard JSONL detection (one JSON per line)
        if (isStandardJsonLinesFormat(lines)) {
            return true;
        }

        // Then try multi-line JSON objects detection
        return isMultiLineJsonObjectsFormat(content);
    }

    /**
     * Check if content is standard JSONL format (one JSON object per line).
     */
    private static boolean isStandardJsonLinesFormat(String[] lines) {
        int validJsonLines = 0;
        for (String line : lines) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                // Simple normalization for format detection only (avoid recursion)
                String normalizedLine = normalizeBareEllipsis(line);
                JSON_MAPPER.readTree(normalizedLine);
                validJsonLines++;
            } catch (Exception e) {
                // If any line is not valid JSON after normalization, it's not standard JSONL
                return false;
            }
        }

        return validJsonLines >= 2; // At least 2 valid JSON lines
    }

    /**
     * Check if content contains multiple JSON objects separated by blank lines or newlines.
     * This handles pretty-printed JSON objects that span multiple lines.
     */
    private static boolean isMultiLineJsonObjectsFormat(String content) {
        // Check if content looks like multiple JSON objects separated by newlines
        String trimmed = content.trim();
        if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) {
            return false;
        }

        // Look for patterns that suggest multiple JSON objects
        // Count opening and closing braces at the top level
        int braceDepth = 0;
        int objectCount = 0;
        boolean inString = false;
        boolean escaped = false;

        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);

            if (escaped) {
                escaped = false;
                continue;
            }

            if (c == '\\') {
                escaped = true;
                continue;
            }

            if (c == '"') {
                inString = !inString;
                continue;
            }

            if (!inString) {
                if (c == '{') {
                    if (braceDepth == 0) {
                        objectCount++;
                    }
                    braceDepth++;
                } else if (c == '}') {
                    braceDepth--;
                }
            }
        }

        return objectCount > 1;
    }

    /**
     * Simple MongoDB syntax normalization for format detection.
     * Avoids recursion issues by not calling the full normalization pipeline.
     */
    private static String normalizeMongoSyntaxSimple(String content) {
        // Just handle bare ellipsis patterns that break JSON parsing
        return normalizeBareEllipsis(content);
    }

    /**
     * Check if content has mixed format (comments + JSON).
     */
    private static boolean hasMixedContent(String content) {
        return (content.contains("//") || content.contains("/*")) &&
               (content.contains("{") || content.contains("["));
    }

    /**
     * Check if content contains single quotes that suggest it's JSON with single quote syntax.
     */
    private static boolean hasSingleQuotes(String content) {
        // Look for patterns like 'key': 'value' that suggest single-quoted JSON
        return content.contains("'") &&
               (content.contains("':") || content.contains("': ")) &&
               (content.trim().startsWith("{") || content.trim().startsWith("["));
    }

    /**
     * Parse JSONL files line by line.
     * Implementation for spec section 5.2.2
     */
    public static List<JsonNode> parseJSONL(Path filePath) throws IOException {
        List<JsonNode> documents = new ArrayList<>();

        try (BufferedReader reader = Files.newBufferedReader(filePath, StandardCharsets.UTF_8)) {
            String line;
            int lineNumber = 0;
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                line = line.trim();
                if (line.isEmpty()) {
                    continue;
                }

                try {
                    JsonNode node = JSON_MAPPER.readTree(line);
                    documents.add(node);
                } catch (Exception e) {
                    throw new IOException("Invalid JSON on line " + lineNumber + ": " + e.getMessage());
                }
            }
        }

        return documents;
    }

    /**
     * Handle MongoDB Extended JSON with proper type conversion.
     * Implementation for spec section 5.2.3
     */
    public static JsonNode parseExtendedJSON(String content) throws IOException {
        // First normalize Extended JSON patterns to standard JSON
        String normalizedContent = normalizeExtendedJson(content);

        try {
            return JSON_MAPPER.readTree(normalizedContent);
        } catch (Exception e) {
            throw new IOException("Failed to parse Extended JSON: " + e.getMessage());
        }
    }

    /**
     * Normalize Extended JSON patterns to standard JSON format.
     */
    private static String normalizeExtendedJson(String content) {
        // Handle ObjectId: { "$oid": "..." } -> "..."
        content = EXTENDED_JSON_OBJECTID.matcher(content).replaceAll("\"$1\"");

        // Handle NumberInt: { "$numberInt": "42" } -> 42
        content = EXTENDED_JSON_NUMBERINT.matcher(content).replaceAll("$1");

        // Handle NumberLong: { "$numberLong": "42" } -> 42
        content = EXTENDED_JSON_NUMBERLONG.matcher(content).replaceAll("$1");

        // Handle Date with nested timestamp: { "$date": { "$numberLong": "1639838100000" } }
        Matcher dateTimestampMatcher = EXTENDED_JSON_DATE_TIMESTAMP.matcher(content);
        while (dateTimestampMatcher.find()) {
            long timestamp = Long.parseLong(dateTimestampMatcher.group(1));
            String isoDate = java.time.Instant.ofEpochMilli(timestamp).toString();
            content = dateTimestampMatcher.replaceFirst("\"" + isoDate + "\"");
            dateTimestampMatcher = EXTENDED_JSON_DATE_TIMESTAMP.matcher(content);
        }

        return content;
    }

    /**
     * Strip comments from content while preserving line context.
     * Removes both single-line (//) and multi-line (&#47;* *&#47;) comments,
     * but preserves comments that appear inside string literals.
     */
    private static String stripComments(String content) {
        // First protect string literals by replacing them with placeholders
        List<String> stringLiterals = new ArrayList<>();
        Pattern stringPattern = Pattern.compile("\"(?:[^\"\\\\]|\\\\.)*\"");
        Matcher stringMatcher = stringPattern.matcher(content);

        StringBuilder protectedContent = new StringBuilder();
        int lastEnd = 0;
        while (stringMatcher.find()) {
            protectedContent.append(content, lastEnd, stringMatcher.start());
            String literal = stringMatcher.group();
            stringLiterals.add(literal);
            protectedContent.append("\"STRING_LITERAL_").append(stringLiterals.size() - 1).append("\"");
            lastEnd = stringMatcher.end();
        }
        protectedContent.append(content.substring(lastEnd));

        String workingContent = protectedContent.toString();

        // Remove multi-line comments
        workingContent = MULTI_LINE_COMMENT.matcher(workingContent).replaceAll("");

        // Remove single-line comments
        workingContent = SINGLE_LINE_COMMENT.matcher(workingContent).replaceAll("");

        // Restore string literals
        for (int i = 0; i < stringLiterals.size(); i++) {
            workingContent = workingContent.replace("\"STRING_LITERAL_" + i + "\"", stringLiterals.get(i));
        }

        return workingContent;
    }

    /**
    * Parse an expected output file and return normalized data.
    * Includes format detection and robust processing.
     */
    public static ParseResult parseFile(String filePath) {
        try {
            Path path = resolvePath(filePath);
            if (!Files.exists(path)) {
                return ParseResult.failure("File not found: " + filePath);
            }

            // Detect format first
            FileFormat format = detectFormat(path);
            String content = readFileWithEncoding(path);

            return parseContentWithFormat(content, format);

        } catch (IOException e) {
            return ParseResult.failure("Failed to read file: " + e.getMessage());
        } catch (Exception e) {
            return ParseResult.failure("Parsing error: " + e.getMessage());
        }
    }

    /**
    * Parse content string into normalized data structure.
    * Detects global ellipsis patterns and handles multiple formats.
     */
    public static ParseResult parseContent(String content) {
        try {
            content = content.trim();

            if (content.isEmpty()) {
                return ParseResult.success(List.of());
            }

            // Detect format and parse accordingly
            FileFormat format = detectFormatFromContent(content);
            return parseContentWithFormat(content, format);

        } catch (Exception e) {
            return ParseResult.failure("Parsing error: " + e.getMessage());
        }
    }

    /**
     * Parse content based on detected format.
     */
    private static ParseResult parseContentWithFormat(String content, FileFormat format) {
        try {
            // Check for global ellipsis pattern in content
            boolean hasGlobalEllipsis = detectGlobalEllipsis(content);

            // IMPORTANT: Check for SIMPLE ellipsis patterns BEFORE trying to parse as JSON
            // This fixes the issue where "..." was being passed to JSON parser and failing
            // But we DON'T want to treat complex JSON containing ellipsis as a simple pattern
            if (isSimpleEllipsisPattern(content)) {
                return ParseResult.success(content);
            }

            Object parsed = null;

            // Parse based on detected format
            switch (format) {
                case JSONL -> {
                    parsed = parseAsJsonLinesContent(content);
                }
                case EXTENDED_JSON -> {
                    JsonNode node = parseExtendedJSON(content);
                    parsed = convertJsonNodeToObject(node);
                }
                case MIXED -> {
                    String cleanedContent = stripComments(content);
                    parsed = parseWithMultipleStrategies(cleanedContent);
                }
                default -> {
                    // Standard JSON processing with normalization
                    String normalizedContent = normalizeMongoSyntax(content);
                    parsed = parseWithMultipleStrategies(normalizedContent);
                }
            }

            if (parsed == null) {
                return ParseResult.failure(analyzeParsingError(content, new Exception("Failed to parse content"), format));
            }

            // If global ellipsis was detected, add it to the parsed object
            if (hasGlobalEllipsis && parsed instanceof java.util.Map<?, ?> map) {
                @SuppressWarnings("unchecked")
                java.util.Map<String, Object> mutableMap = new java.util.HashMap<>((java.util.Map<String, Object>) map);
                mutableMap.put("...", "...");
                parsed = mutableMap;
            }

            // Normalize the parsed data using the simplified ValueNormalizer
            Object normalized = mongodb.comparison.internal.ValueNormalizer.normalize(parsed);

            // If it's a List with a single element, and that element is not itself a List,
            // extract the single element for easier comparison.
            // BUT: Don't do this for JSONL or MIXED format, which explicitly indicate multiple objects
            // EXCEPTION: If the single element contains global ellipsis, extract it
            if (normalized instanceof List<?> list && list.size() == 1) {
                Object singleElement = list.get(0);
                if (!(singleElement instanceof List)) {
                    // For JSONL format, only extract if it contains global ellipsis
                    if (format != FileFormat.JSONL && format != FileFormat.MIXED) {
                        normalized = singleElement;
                    } else if (singleElement instanceof Map<?, ?> map && map.containsKey("...")) {
                        // Extract single element with global ellipsis even from JSONL
                        normalized = singleElement;
                    }
                }
            }

            return ParseResult.success(normalized);

        } catch (Exception e) {
            return ParseResult.failure(analyzeParsingError(content, e, format));
        }
    }

    /**
     * Try multiple parsing strategies in order of priority.
     * Enhanced to handle pretty-printed JSON and multi-line formats.
     * Prioritize JSON Lines parsing for mixed content with multiple objects.
     */
    private static Object parseWithMultipleStrategies(String content) {
        // Strategy 1: Try as pretty-printed JSON array first (handles multi-line arrays)
        Object result = parseAsPrettyJsonArray(content);
        if (result != null) return result;

        // Strategy 2: Try as JSON Lines format (one JSON object per line)
        result = parseAsJsonLines(content);
        if (result != null) return result;

        // Strategy 3: Try as standard JSON array
        result = parseAsJsonArray(content);
        if (result != null) return result;

        // Strategy 4: Try as pretty-printed JSON object (moved down to avoid early single-object match)
        result = parseAsPrettyJsonObject(content);
        if (result != null) return result;

        // Strategy 5: Try as single JSON document
        result = parseAsSingleDocument(content);
        if (result != null) return result;

        // Strategy 6: Try as plain text list (line-separated strings)
        result = parseAsPlainTextList(content);
        if (result != null) return result;

        return null;
    }

    /**
     * Try to parse as pretty-printed JSON array with line breaks and formatting.
     */
    private static List<Object> parseAsPrettyJsonArray(String content) {
        try {
            content = content.trim();

            // Must start and end with array brackets
            if (!content.startsWith("[") || !content.endsWith("]")) {
                return null;
            }

            // Try to parse as JSON array directly (Jackson handles pretty-printing automatically)
            JsonNode arrayNode = JSON_MAPPER.readTree(content);
            if (!arrayNode.isArray()) {
                return null;
            }

            List<Object> documents = new ArrayList<>();
            for (JsonNode element : arrayNode) {
                documents.add(convertJsonNodeToObject(element));
            }

            return documents;

        } catch (Exception e) {
            // If standard JSON parsing fails, might be invalid JSON structure
            return null;
        }
    }

    /**
     * Try to parse as pretty-printed JSON object with line breaks and formatting.
     */
    private static Object parseAsPrettyJsonObject(String content) {
        try {
            content = content.trim();

            // Must start and end with object braces
            if (!content.startsWith("{") || !content.endsWith("}")) {
                return null;
            }

            // Try to parse as JSON object directly (Jackson handles pretty-printing automatically)
            JsonNode objectNode = JSON_MAPPER.readTree(content);
            if (!objectNode.isObject()) {
                return null;
            }

            return convertJsonNodeToObject(objectNode);

        } catch (Exception e) {
            // If standard JSON parsing fails, might be invalid JSON structure
            return null;
        }
    }

    /**
    * Parse JSONL content from string.
    * Handles bare ellipsis patterns in each line.
     */
    private static List<Object> parseAsJsonLinesContent(String content) {
        try {
            // First try standard line-by-line JSONL parsing
            String[] lines = content.split("\n");
            List<Object> documents = new ArrayList<>();

            // If all lines parse successfully, it's standard JSONL
            boolean isStandardJsonl = true;
            boolean hasStandaloneEllipsis = false;

            for (String line : lines) {
                line = line.trim();
                if (line.isEmpty()) continue;

                // Handle standalone ellipsis lines (both quoted and unquoted)
                if (line.equals("...") || line.equals("\"...\"")) {
                    hasStandaloneEllipsis = true;
                    continue; // Skip adding ellipsis as a document, just mark the flag
                }

                try {
                    String normalizedLine = normalizeMongoSyntax(line);
                    JsonNode node = JSON_MAPPER.readTree(normalizedLine);
                    documents.add(convertJsonNodeToObject(node));
                } catch (Exception e) {
                    isStandardJsonl = false;
                    break;
                }
            }

            if (isStandardJsonl && !documents.isEmpty()) {
                // If we found standalone ellipsis lines, merge all documents into one with global ellipsis
                if (hasStandaloneEllipsis) {
                    // Merge all documents into a single object with global ellipsis marker
                    Map<String, Object> mergedDocument = new LinkedHashMap<>();

                    for (Object doc : documents) {
                        if (doc instanceof Map<?, ?> docMap) {
                            for (Map.Entry<?, ?> entry : docMap.entrySet()) {
                                mergedDocument.put(String.valueOf(entry.getKey()), entry.getValue());
                            }
                        }
                    }

                    // Add global ellipsis marker
                    mergedDocument.put("...", "...");
                    return List.of(mergedDocument);
                }

                return documents;
            }

            // Clear and try multi-line JSON object parsing
            documents.clear();

            // Parse character by character to find complete JSON objects
            List<String> objects = splitMultiLineJsonObjects(content);


            for (String obj : objects) {
                String normalizedObj = normalizeMongoSyntax(obj);


                JsonNode node = JSON_MAPPER.readTree(normalizedObj);
                documents.add(convertJsonNodeToObject(node));
            }

            return documents.isEmpty() ? null : documents;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Split content into multiple JSON objects based on brace matching.
     * This handles pretty-printed multi-line JSON objects separated by newlines.
     */
    private static List<String> splitMultiLineJsonObjects(String content) {
        List<String> objects = new ArrayList<>();
        String trimmed = content.trim();

        // Parse character by character to find complete JSON objects
        StringBuilder currentObject = new StringBuilder();
        int braceDepth = 0;
        boolean inString = false;
        boolean escaped = false;

        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);

            if (escaped) {
                escaped = false;
                currentObject.append(c);
                continue;
            }

            if (c == '\\') {
                escaped = true;
                currentObject.append(c);
                continue;
            }

            if (c == '"') {
                inString = !inString;
                currentObject.append(c);
                continue;
            }

            currentObject.append(c);

            if (!inString) {
                if (c == '{') {
                    braceDepth++;
                } else if (c == '}') {
                    braceDepth--;
                    if (braceDepth == 0) {
                        // Complete object found
                        String obj = currentObject.toString().trim();
                        if (!obj.isEmpty()) {
                            objects.add(obj);
                        }
                        currentObject = new StringBuilder();

                        // Skip whitespace until next object
                        while (i + 1 < trimmed.length() && Character.isWhitespace(trimmed.charAt(i + 1))) {
                            i++;
                        }
                    }
                }
            }
        }

        // Handle any remaining content
        String remaining = currentObject.toString().trim();
        if (!remaining.isEmpty() && braceDepth == 0) {
            objects.add(remaining);
        }

        return objects;
    }

    /**
     * Detect global ellipsis patterns in file content.
     * Looks for standalone "..." lines indicating omitted fields mode.
     */
    private static boolean detectGlobalEllipsis(String content) {
        return mongodb.comparison.internal.EllipsisPatternRegistry.detectGlobalEllipsis(content);
    }

    /**
     * Check if content is a simple ellipsis pattern that should not be parsed as JSON.
     * This excludes complex JSON structures that contain ellipsis but should be parsed.
     */
    private static boolean isSimpleEllipsisPattern(String content) {
        content = content.trim();

        // Simple ellipsis marker
        if (content.equals("...")) {
            return true;
        }

        // Prefix or suffix ellipsis patterns (...something or something...)
        if (content.matches("^\\.\\.\\..*$") || content.matches("^.*\\.\\.\\.$")) {
            return true;
        }

        // Array ellipsis pattern [...]
        if (content.matches("\\[\\s*\\.\\.\\.\\s*\\]")) {
            return true;
        }

        // String patterns with embedded ellipsis like "Result: [...]" or "Result: {...}"
        // But NOT JSON object/array patterns like {"_id": "..."}
        if (content.contains("...") &&
            !content.trim().startsWith("{") &&
            !content.trim().startsWith("[")) {
            return true;
        }

        return false;
    }

    /**
    * Resolve file path relative to the calling module.
    * Path resolution strategy for different project structures.
    * Implementation for spec section 6.5 - File Path Resolution Strategy.
     */
    private static Path resolvePath(String filePath) {
        // If absolute path, use as-is
        if (Paths.get(filePath).isAbsolute()) {
            return Paths.get(filePath);
        }

        // Get current working directory
        Path currentDir = Paths.get(System.getProperty("user.dir"));

        // Strategy 1: Look for file relative to current working directory
        Path resolved = currentDir.resolve(filePath);
        if (Files.exists(resolved)) {
            return resolved;
        }

        // Strategy 2: Look in examples directory relative to current directory
        Path examplesPath = currentDir.resolve("examples").resolve(filePath);
        if (Files.exists(examplesPath)) {
            return examplesPath;
        }

        // Strategy 3: Look in ../examples directory (when running from test directory)
        Path parentExamplesPath = currentDir.getParent().resolve("examples").resolve(filePath);
        if (Files.exists(parentExamplesPath)) {
            return parentExamplesPath;
        }

        // Strategy 4: Look in src/main/java directory structure
        Path srcPath = currentDir.resolve("src/main/java").resolve(filePath);
        if (Files.exists(srcPath)) {
            return srcPath;
        }

        // Strategy 5: Look in test resources
        Path testResourcesPath = currentDir.resolve("src/test/resources").resolve(filePath);
        if (Files.exists(testResourcesPath)) {
            return testResourcesPath;
        }

        // Strategy 6: Look in src/test/resources/examples
        Path testExamplesPath = currentDir.resolve("src/test/resources/examples").resolve(filePath);
        if (Files.exists(testExamplesPath)) {
            return testExamplesPath;
        }

        // Strategy 7: Search in parent directories for examples folder (up to 3 levels)
        Path searchDir = currentDir;
        for (int i = 0; i < 3; i++) {
            Path parentExamples = searchDir.resolve("examples").resolve(filePath);
            if (Files.exists(parentExamples)) {
                return parentExamples;
            }
            searchDir = searchDir.getParent();
            if (searchDir == null) {
                break;
            }
        }

        // Return original path (will fail with file not found)
        return Paths.get(filePath);
    }

    /**
     * Normalize MongoDB-specific syntax to valid JSON.
     * Preserve ellipsis patterns during normalization and handle comments.
     */
    private static String normalizeMongoSyntax(String content) {
        String original = content;

        // Step 0: Strip comments first if present
        if (content.contains("//") || content.contains("/*")) {
            content = stripComments(content);
        }

        // Step 1: Handle bare ellipsis patterns that are invalid JSON
        // These need to be quoted to be valid JSON but should remain as ellipsis patterns
        content = normalizeBareEllipsis(content);

        // Step 2: Preserve ellipsis patterns before other normalization
        // We need to handle ellipsis in MongoDB constructors specially
        content = preserveEllipsisInConstructors(content);

        // Step 2.5: Handle array ellipsis patterns [...]
        content = normalizeArrayEllipsis(content);

        // Step 3: Handle MongoDB constructors (after ellipsis preservation)
        content = OBJECTID_PATTERN.matcher(content).replaceAll("\"$1\"");
        content = DATE_PATTERN.matcher(content).replaceAll("\"$1\"");

        // Step 4: Handle { "$date": "..." } syntax by converting to just the date string
        content = DOLLAR_DATE_PATTERN.matcher(content).replaceAll("\"$1\"");

        // Step 5: Convert single quotes to double quotes (but preserve ellipsis)
        content = preserveEllipsisInQuotes(content);

        // Step 5.5: Fix improperly escaped quotes in JSON string values
        content = fixQuoteEscaping(content);

        // Step 6: Add quotes to unquoted keys (do this last to avoid interfering with quoted values)
        content = UNQUOTED_KEY_PATTERN.matcher(content).replaceAll("$1\"$2\":");

        // Step 7: Remove trailing commas for valid JSON
        content = removeTrailingCommas(content);

        return content;
    }

    /**
     * Normalize bare ellipsis patterns to valid JSON.
     * Handles cases like: "runtime": ... -> "runtime": "..."
     * And standalone ellipsis in arrays: [item, ...] -> [item, "..."]
     * And standalone ellipsis on its own line to indicate omitted fields
     */
    private static String normalizeBareEllipsis(String content) {
        // Pattern 1: Value ellipsis - "key": ... -> "key": "..."
        // Look for : followed by optional whitespace, then ..., then optional whitespace before , or } or ]
        content = content.replaceAll("(:\\s*)\\.\\.\\.(?=\\s*[,}\\]])", "$1\"...\"");

        // Pattern 2: Standalone ellipsis in arrays - [..., ..., ...] -> [..., "...", ...]
        // Look for ellipsis that's preceded by comma or [ and followed by comma or ]
        content = content.replaceAll("([,\\[]\\s*)\\.\\.\\.(?=\\s*[,\\]])", "$1\"...\"");

        // Pattern 3: Array element ellipsis at start - [    ...    ] -> [    "..."    ]
        content = content.replaceAll("(\\[\\s*)\\.\\.\\.(?=\\s*[,\\]])", "$1\"...\"");

        // Pattern 4: Standalone ellipsis on its own line to indicate omitted fields
        // Converts `...` on its own line to `"...": "..."` for the comparison engine
        // This enables support for patterns like { ok: 1, ... } where ... indicates more fields exist
        // We add a trailing comma to ensure valid JSON when there are more fields after
        content = content.replaceAll("(?m)^(\\s*)\\.\\.\\.\\s*$", "$1\"...\": \"...\",");

        return content;
    }

    /**
     * Remove trailing commas for valid JSON.
     * Handles cases like: { "ok": 1, } -> { "ok": 1 }
     */
    private static String removeTrailingCommas(String content) {
        // Remove trailing commas before }
        content = content.replaceAll(",(\\s*)}", "$1}");
        // Remove trailing commas before ]
        content = content.replaceAll(",(\\s*)]", "$1]");
        return content;
    }

    /**
     * Normalize array ellipsis patterns to valid JSON.
     * Converts [...] to ["..."] so it can be parsed as a JSON array with a single ellipsis element.
     */
    private static String normalizeArrayEllipsis(String content) {
        // Replace [...] with ["..."]
        content = content.replaceAll("\\[\\s*\\.\\.\\.\\s*\\]", "[\"...\"]");
        return content;
    }

    /**
     * Preserve ellipsis patterns in MongoDB constructors.
     * Converts ObjectId('...') to ObjectId('ELLIPSIS_PLACEHOLDER') temporarily.
     */
    private static String preserveEllipsisInConstructors(String content) {
        // Handle ObjectId with ellipsis: ObjectId('...') -> ObjectId('ELLIPSIS_PLACEHOLDER')
        content = content.replaceAll("ObjectId\\([\"']\\.\\.\\.[\"']\\)", "ObjectId('ELLIPSIS_PLACEHOLDER')");
        content = content.replaceAll("Date\\([\"']\\.\\.\\.[\"']\\)", "Date('ELLIPSIS_PLACEHOLDER')");

        return content;
    }

    /**
     * Fix improperly escaped quotes in JSON string values.
     * This handles patterns like: "text with "quoted" content"
     * by properly escaping the internal quotes to: "text with \"quoted\" content"
     */
    private static String fixQuoteEscaping(String content) {
        // Use regex to find JSON string values and escape unescaped quotes within them
        // Pattern: "key": "value with unescaped "quotes" inside"
        // Should become: "key": "value with escaped \"quotes\" inside"

        StringBuilder result = new StringBuilder();
        boolean inString = false;
        boolean escaped = false;

        for (int i = 0; i < content.length(); i++) {
            char c = content.charAt(i);

            if (escaped) {
                result.append(c);
                escaped = false;
            } else if (c == '\\') {
                result.append(c);
                escaped = true;
            } else if (c == '"') {
                if (inString) {
                    // Check if this closes a JSON string value (followed by comma, }, or ])
                    int nextNonWhitespace = i + 1;
                    while (nextNonWhitespace < content.length() &&
                           Character.isWhitespace(content.charAt(nextNonWhitespace))) {
                        nextNonWhitespace++;
                    }

                    if (nextNonWhitespace >= content.length() ||
                        content.charAt(nextNonWhitespace) == ',' ||
                        content.charAt(nextNonWhitespace) == '}' ||
                        content.charAt(nextNonWhitespace) == ']') {
                        // This closes the string
                        inString = false;
                        result.append(c);
                    } else {
                        // This is a quote inside the string value, escape it
                        result.append("\\\"");
                    }
                } else {
                    // Check if this starts a JSON string value (preceded by : and optional whitespace)
                    int prevNonWhitespace = i - 1;
                    while (prevNonWhitespace >= 0 &&
                           Character.isWhitespace(content.charAt(prevNonWhitespace))) {
                        prevNonWhitespace--;
                    }

                    if (prevNonWhitespace >= 0 && content.charAt(prevNonWhitespace) == ':') {
                        // This starts a string value
                        inString = true;
                    }
                    result.append(c);
                }
            } else {
                result.append(c);
            }
        }

        return result.toString();
    }

    /**
    * Preserve ellipsis patterns when converting quotes and restore placeholders.
    * Handles complex quote escaping scenarios.
     */
    private static String preserveEllipsisInQuotes(String content) {
        // Pattern for single-quoted strings with proper escape handling
        Pattern enhancedSingleQuotePattern = Pattern.compile("'((?:[^'\\\\]|\\\\.)*)'");

        Matcher matcher = enhancedSingleQuotePattern.matcher(content);
        StringBuilder result = new StringBuilder();
        int lastEnd = 0;

        while (matcher.find()) {
            result.append(content, lastEnd, matcher.start());
            String quotedContent = matcher.group(1);

            // Handle escape sequences properly - order matters!
            // First handle escaped backslashes (\\), then escaped quotes (\')
            quotedContent = quotedContent.replace("\\\\", "\u0001ESCAPED_BACKSLASH\u0001");  // Temporarily replace
            quotedContent = quotedContent.replace("\\'", "'");  // Unescape single quotes
            quotedContent = quotedContent.replace("\u0001ESCAPED_BACKSLASH\u0001", "\\\\"); // Restore backslashes
            quotedContent = quotedContent.replace("\"", "\\\""); // Escape double quotes for JSON

            result.append("\"").append(quotedContent).append("\"");
            lastEnd = matcher.end();
        }
        result.append(content.substring(lastEnd));
        content = result.toString();

        // Restore ellipsis markers from placeholders
        content = content.replace("\"ELLIPSIS_PLACEHOLDER\"", "\"...\"");

        return content;
    }

    /**
     * Try to parse as JSON Lines format (one JSON object per line).
     */
    private static List<Object> parseAsJsonLines(String content) {
        try {
            String[] lines = content.split("\n");
            List<Object> documents = new ArrayList<>();

            for (String line : lines) {
                line = line.trim();
                if (!line.isEmpty()) {
                    JsonNode node = JSON_MAPPER.readTree(line);
                    documents.add(convertJsonNodeToObject(node));
                }
            }

            return documents.isEmpty() ? null : documents;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Try to parse as JSON array.
     */
    private static List<Object> parseAsJsonArray(String content) {
        try {
            if (!content.startsWith("[") || !content.endsWith("]")) {
                return null;
            }

            JsonNode arrayNode = JSON_MAPPER.readTree(content);
            if (!arrayNode.isArray()) {
                return null;
            }

            List<Object> documents = new ArrayList<>();
            for (JsonNode element : arrayNode) {
                documents.add(convertJsonNodeToObject(element));
            }

            return documents;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Try to parse as single JSON document.
     */
    private static Object parseAsSingleDocument(String content) {
        try {
            JsonNode node = JSON_MAPPER.readTree(content);
            return convertJsonNodeToObject(node);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Convert Jackson JsonNode to plain Java objects (compatible with BSON).
     */
    private static Object convertJsonNodeToObject(JsonNode node) {
        if (node.isNull()) {
            return null;
        } else if (node.isBoolean()) {
            return node.booleanValue();
        } else if (node.isInt()) {
            return node.intValue();
        } else if (node.isLong()) {
            return node.longValue();
        } else if (node.isDouble()) {
            return node.doubleValue();
        } else if (node.isTextual()) {
            return node.textValue();
        } else if (node.isArray()) {
            List<Object> list = new ArrayList<>();
            for (JsonNode element : node) {
                list.add(convertJsonNodeToObject(element));
            }
            return list;
        } else if (node.isObject()) {
            Document document = new Document();
            node.fieldNames().forEachRemaining(fieldName -> {
                document.put(fieldName, convertJsonNodeToObject(node.get(fieldName)));
            });
            return document;
        }
        return node.toString();
    }

    /**
     * Analyze parsing errors and provide specific suggestions for common issues.
     */
    private static String analyzeParsingError(String content, Exception e, FileFormat format) {
        StringBuilder analysis = new StringBuilder();
        analysis.append("Parsing error: ").append(e.getMessage());
        analysis.append(" (Format detected: ").append(format).append(")");

        // Analyze content for common issues
        List<String> suggestions = new ArrayList<>();

        // Check for unescaped quotes
        if (content.contains("\"") && content.matches(".*\"[^\"]*\"[^\"]*\".*")) {
            if (content.matches(".*\"[^\"\\\\]*\"[^\"]*\".*")) {
                suggestions.add("Unescaped quotes found - strings with quotes should be properly escaped");
            }
        }

        // Check for ObjectId issues
        if (content.contains("ObjectId(") && !content.contains("ObjectId(\"") && !content.contains("ObjectId('")) {
            suggestions.add("ObjectId values should be quoted: ObjectId('value') or ObjectId(\"value\")");
        }

        // Check for malformed ObjectId syntax
        if (content.matches(".*ObjectId\\(['\"][^'\"]*['\"]\\).*") == false && content.contains("ObjectId(")) {
            suggestions.add("ObjectId syntax appears malformed - should be quoted");
        }

        // Check for inline comments in JSON
        if (content.contains("/*") || content.contains("//")) {
            suggestions.add("remove comments from JSON content - standard JSON does not support comments");
        }

        // Check for unquoted keys
        if (content.matches(".*[{,]\\s*\\w+\\s*:.*")) {
            suggestions.add("JSON keys should be quoted - use \"key\": instead of key:");
        }

        // Check for single quotes in JSON
        if (content.contains("'") && format != FileFormat.EXTENDED_JSON) {
            suggestions.add("Use double quotes instead of single quotes for JSON strings");
        }

        if (!suggestions.isEmpty()) {
            analysis.append("\n\nSuggestions:\n");
            for (String suggestion : suggestions) {
                analysis.append("- ").append(suggestion).append("\n");
            }
        }

        return analysis.toString();
    }

    /**
     * Result of parsing operation.
     */
    public static class ParseResult {
        private final boolean success;
        private final Object data;
        private final String errorMessage;

        private ParseResult(boolean success, Object data, String errorMessage) {
            this.success = success;
            this.data = data;
            this.errorMessage = errorMessage;
        }

        public static ParseResult success(Object data) {
            return new ParseResult(true, data, null);
        }

        public static ParseResult failure(String errorMessage) {
            return new ParseResult(false, null, errorMessage);
        }

        public boolean isSuccess() {
            return success;
        }

        public Object getData() {
            return data;
        }

        public String getErrorMessage() {
            return errorMessage;
        }
    }

    /**
     * Try to parse as plain text list (line-separated strings).
     * This handles cases like:
     * Italian
     * Pizza
     * Sandwiches
     * Bakery
     * Coffee
     */
    private static List<String> parseAsPlainTextList(String content) {
        try {
            content = content.trim();

            // Split into lines
            String[] lines = content.split("\n");

            // Must have at least 2 lines to be considered a list
            if (lines.length < 2) {
                return null;
            }

            // Check if all lines are simple text (no JSON-like characters)
            List<String> result = new ArrayList<>();
            for (String line : lines) {
                line = line.trim();
                if (line.isEmpty()) {
                    continue; // Skip empty lines
                }

                // If line contains JSON-like characters, this is not a plain text list
                if (line.contains("{") || line.contains("}") || line.contains("[") || line.contains("]") ||
                    line.contains("\"") || line.contains(":")) {
                    return null;
                }

                result.add(line);
            }

            // Must have at least 2 non-empty lines
            if (result.size() < 2) {
                return null;
            }

            return result;
        } catch (Exception e) {
            return null;
        }
    }
}
