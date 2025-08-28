# Comparison Functionality Spec for Example Output Validation

This specification describes the step-by-step process for comparing an actual output (from a MongoDB operation or code example) with an expected output file. The process is language-agnostic and can be implemented in any programming language.

**Key Features:**
- **Universal Field Ignoring**: Use `ignoreFieldValues` to ignore any dynamic fields (ObjectIds, timestamps, UUIDs, etc.)
- **Automatic Ellipsis Detection**: Intelligent pattern recognition for flexible content matching
- **Cross-Language Compatibility**: Consistent behavior across all programming languages
- **MongoDB Type Support**: Native handling of ObjectId, Decimal128, and Date constructors
- **Flexible Array Comparison**: Support for both ordered and unordered array matching strategies

---

## 1. Reading and Parsing the Expected Output File

- **Input:** Path to the expected output file (text file containing MongoDB Document Syntax).
- **Action:**
  - Read the file contents as a string.
  - The file may contain:
    - MongoDB documents and arrays using relaxed syntax
    - Single-quoted strings
    - Unquoted keys
    - Special ellipsis markers (`...`) for truncation or omission
    - MongoDB type constructors (e.g., `ObjectId('...')`, `Decimal128('...')`, `Date('...')`)

**Note on MongoDB Document Syntax:** The expected output files use MongoDB's relaxed document syntax, similar to what you see in MongoDB shell or documentation examples. This is **not** standard JSON - it supports unquoted keys, single quotes, and MongoDB-specific constructors like `ObjectId()` and `Decimal128()`. For example:

```javascript
// MongoDB Document Syntax (what the files contain)
{
  _id: ObjectId('507f1f77bcf86cd799439011'),
  name: 'John Doe',
  balance: Decimal128('123.45'),
  tags: ['user', 'active']
}

// This is NOT standard JSON
```

### 1.1. File Content Preprocessing
- Split content into document blocks (separated by blank lines or logical delimiters)
- For each block, apply syntax normalization:
  - Convert single-quoted strings to double-quoted strings
  - Wrap unquoted keys in double quotes using regex: `(\b[a-zA-Z_][\w]*)\s*:` → `"$1":`
  - Handle unquoted ISO date strings and quote them appropriately
  - Handle MongoDB constructor syntax preservation during initial parsing

### 1.2. Safe Evaluation Context
- Create a controlled execution environment with MongoDB type constructors
- Provide safe constructors for:
  - `ObjectId(value)` → Creates ObjectId instance or string representation
  - `Decimal128(value)` → Creates Decimal128 instance or string representation
  - `Date(value)` → Creates Date instance
- Parse each document block using the controlled environment
- Return array of parsed document objects

---

## 2. Data Normalization

Apply normalization to both expected and actual data structures before comparison.

### 2.1. MongoDB Type Normalization
- **ObjectId instances**: Convert to canonical string representation
- **Decimal128 instances**: Convert to string representation
- **Date objects**: Convert to ISO 8601 UTC string format (e.g., "2023-01-01T12:00:00.000Z")
- **ISO date strings**: Normalize format to ensure consistent representation

### 2.2. Recursive Structure Normalization
Apply normalization recursively to:
- Object properties (normalize values)
- Array elements (normalize each element)
- Nested structures (maintain structure while normalizing content)

### 2.3. Global Configuration Detection (Automatic)
Scan expected output for global ellipsis markers:
- A standalone line containing only `...` indicates "omitted fields allowed" mode
- This affects comparison behavior at all levels (allows extra keys in actual output)
- **Detection is automatic** - no manual configuration required

### 2.4. Field Value Ignoring
Apply field value ignoring when `ignoreFieldValues` option is provided:
- **Universal Field Support**: Ignore any field by name regardless of data type
- **Nested Field Support**: Ignoring applies to fields at any nesting level
- **Common Use Cases**:
  - Database IDs: `_id`, `userId`, `documentId`
  - Timestamps: `createdAt`, `updatedAt`, `timestamp`
  - UUIDs and tokens: `uuid`, `sessionId`, `apiKey`
  - Auto-generated values: Any field with dynamic content
- **Behavior**: Field names must be present in both expected and actual output, but values are not compared

---

## 3. Core Comparison Algorithm

### 3.1. Entry Point Strategy
```
function compareValues(expected, actual, options, hasOmittedFields):
    // Step 1: Handle ellipsis patterns first
    ellipsisResult = handleEllipsisPatterns(expected, actual)
    if ellipsisResult.handled:
        return ellipsisResult.matches

    // Step 2: Handle null/undefined cases
    if expected == null OR actual == null:
        return expected === actual

    // Step 3: Handle primitive types (non-objects)
    if typeof expected != "object" OR typeof actual != "object":
        return comparePrimitives(expected, actual)

    // Step 4: Handle arrays
    if both expected and actual are arrays:
        return compareArrays(expected, actual, options, hasOmittedFields)

    // Step 5: Handle type mismatches (one array, one object)
    if exactly one of expected/actual is array:
        return false

    // Step 6: Handle objects
    return compareObjects(expected, actual, options, hasOmittedFields)
```

### 3.2. Ellipsis Pattern Handling

#### 3.2.1. Property-Level Ellipsis
```
function handlePropertyLevelEllipsis(expected, actual):
    truncResult = checkTruncatedValue(expected)

    if truncResult == "exact_ellipsis":  // expected === "..."
        return {handled: true, matches: true}

    if truncResult == "truncated":  // expected.endsWith("...")
        if actual is string:
            prefix = expected.slice(0, -3)
            return {handled: true, matches: actual.startsWith(prefix)}
        else:
            return {handled: true, matches: false}

    return {handled: false}
```

#### 3.2.2. Array-Level Ellipsis
```
function handleArrayLevelEllipsis(expectedArray, actualArray):
    // Case 1: Full array wildcard ["..."]
    if expectedArray == ["..."]:
        return {handled: true, matches: true}

    // Case 2: Array contains ellipsis elements
    if expectedArray contains "...":
        return {handled: true, requiresSpecialMatching: true}

    // Case 3: Array contains truncated elements
    if any element in expectedArray is truncated:
        return {handled: true, matches: true}  // Delegate to element-wise comparison

    return {handled: false}
```

#### 3.2.3. Object-Level Ellipsis
```
function handleObjectLevelEllipsis(expectedObj, actualObj):
    // Check for wildcard object pattern: {"...": "..."}
    if expectedObj is object AND
       keys(expectedObj) == ["..."] AND
       expectedObj["..."] == "...":
        return {handled: true, matches: actualObj is object}

    return {handled: false}
```

### 3.3. Array Comparison Strategies

#### 3.3.1. Strategy Selection Algorithm
```
function compareArrays(expectedArray, actualArray, options, hasOmittedFields):
    // Handle ellipsis patterns first
    ellipsisResult = handleArrayLevelEllipsis(expectedArray, actualArray)
    if ellipsisResult.handled:
        if ellipsisResult.requiresSpecialMatching:
            return matchArrayWithEllipsis(expectedArray, actualArray, options)
        else:
            return ellipsisResult.matches

    // Determine comparison strategy based on options
    if options.comparisonType == "ordered":
        return compareArraysOrdered(expectedArray, actualArray, compareValues)

    // For unordered arrays, select optimal strategy:
    if options.unordered OR !options.comparisonType:
        if arrays contain mixed primitive/object types:
            return compareArraysHybrid(expectedArray, actualArray, compareValues)
        else:
            return compareArraysByBacktracking(expectedArray, actualArray, compareValues)

    // Default to ordered comparison
    return compareArraysOrdered(expectedArray, actualArray, compareValues)
```

#### 3.3.2. Ordered Array Comparison
```
function compareArraysOrdered(arrayA, arrayB, compareElementsFn):
    if arrayA.length != arrayB.length:
        return false

    for i in 0..<arrayA.length:
        if not compareElementsFn(arrayA[i], arrayB[i]):
            return false

    return true
```

#### 3.3.3. Backtracking Algorithm (for complex objects)
```
function compareArraysByBacktracking(arrayA, arrayB, compareElementsFn):
    if arrayA.length != arrayB.length:
        return false

    return findMatching(arrayA, arrayB, [], compareElementsFn)

function findMatching(remaining_A, remaining_B, used_indices, compareElementsFn):
    if remaining_A is empty:
        return true

    current = remaining_A[0]
    rest_A = remaining_A[1..]

    for i in 0..<remaining_B.length:
        if i not in used_indices AND compareElementsFn(current, remaining_B[i]):
            new_used = used_indices + [i]
            if findMatching(rest_A, remaining_B, new_used, compareElementsFn):
                return true

    return false
```

#### 3.3.4. Hybrid Strategy (mixed primitive/object arrays)
```
function compareArraysHybrid(arrayA, arrayB, compareElementsFn):
    if arrayA.length != arrayB.length:
        return false

    primitivesA = filter(arrayA, isPrimitive)
    primitivesB = filter(arrayB, isPrimitive)
    objectsA = filter(arrayA, not isPrimitive)
    objectsB = filter(arrayB, not isPrimitive)

    // Compare primitives using frequency counting
    if not compareByFrequency(primitivesA, primitivesB):
        return false

    // Compare objects using backtracking
    return compareArraysByBacktracking(objectsA, objectsB, compareElementsFn)

function compareByFrequency(arrayA, arrayB):
    freqA = buildFrequencyMap(arrayA)
    freqB = buildFrequencyMap(arrayB)
    return freqA == freqB
```

### 3.4. Object Comparison

#### 3.4.1. Key Analysis Phase
```
function compareObjects(objA, objB, options, hasOmittedFields):
    // Analyze keys and global ellipsis
    keyAnalysis = analyzeObjectKeys(objA, objB, options)
    if not keyAnalysis.canProceed:
        return false

    // Compare properties
    return compareObjectProperties(objA, objB, compareValues, keyAnalysis, options)

function analyzeObjectKeys(objA, objB, options):
    keysA = keys(objA)
    keysB = keys(objB)

    // Check for global ellipsis marker
    hasGlobalEllipsis = ("..." in keysA AND objA["..."] == "...")
    allowOmittedFields = hasGlobalEllipsis

    // Key set validation
    if not allowOmittedFields:
        if keysA.length != keysB.length:
            return {canProceed: false}
        for key in keysA:
            if key not in keysB AND key != "...":
                return {canProceed: false}
    else:
        # In lenient mode, only check that expected keys exist in actual
        for key in keysA:
            if key not in keysB AND key != "...":
                return {canProceed: false}

    return {
        canProceed: true,
        keysA: keysA,
        keysB: keysB,
        allowOmittedFields: allowOmittedFields,
        hasGlobalEllipsis: hasGlobalEllipsis
    }
```

#### 3.4.2. Property Comparison
```
function compareObjectProperties(objA, objB, compareValuesFn, keyAnalysis, options):
    for key in keyAnalysis.keysA:
        if shouldIgnoreKey(key, options):  # Skip "..." and ignored fields
            continue

        if objA[key] == "...":  # Property-level ellipsis
            continue

        if key not in objB:
            if not keyAnalysis.allowOmittedFields:
                return false
            continue

        if not compareValuesFn(objA[key], objB[key], options, keyAnalysis.allowOmittedFields):
            return false

    return true

function shouldIgnoreKey(key, options):
    if key == "...":
        return true
    if options.ignoreFieldValues AND key in options.ignoreFieldValues:
        return true
    return false
```

### 3.5. Primitive Value Comparison

```
function comparePrimitives(a, b):
    normalizedA = normalizePrimitive(a)
    normalizedB = normalizePrimitive(b)
    return normalizedA === normalizedB

function normalizePrimitive(value):
    # Handle MongoDB BSON types
    if value has _bsontype == "ObjectId":
        return value.toString()
    if value has _bsontype == "Decimal128":
        return value.toString()

    # Handle Date objects
    if value instanceof Date:
        return value.toISOString()

    # Handle ISO date strings (normalize format)
    if value is string AND matches ISO_DATE_REGEX:
        return new Date(value).toISOString()

    return value
```

---

## 4. Implementation Architecture

### 4.1. Modular Design
Organize code into these conceptual modules:

1. **File Processing Module**
   - `readExpectedOutput(filePath) -> string`
   - `preprocessFileContents(rawContent) -> [string]`
   - `parseExpectedOutput(rawContent) -> {success: boolean, data?: [], error?: Error}`

2. **Normalization Module**
   - `normalizeValue(value) -> normalizedValue`
   - `normalizeMongoTypes(value) -> normalizedValue`
   - `normalizeDateValue(value) -> normalizedValue`

3. **Comparison Module**
   - `areObjectsEqual(expected, actual, options, hasOmittedFields) -> boolean`
   - `compareArrays(arrayA, arrayB, options) -> boolean`
   - `comparePrimitives(a, b) -> boolean`

4. **Ellipsis Handling Module**
   - `isTruncatedValue(value) -> boolean|"truncated"`
   - `isObjectEllipsis(value) -> boolean`
   - `matchArrayWithEllipsis(expectedArray, actualArray, options) -> boolean`

### 4.2. Options Structure
```
{
  comparisonType?: "ordered" | "unordered",
  ignoreFieldValues?: string[]
}
```

### 4.3. Regular Expressions (Language-Specific)
- **ISO Date Regex**: `/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?[0-9]*Z?$/`
- **Unquoted Key Regex**: `/(\b[a-zA-Z_][\w]*)\s*:/g`
- **Unquoted Date Regex**: `/:\s*([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.?[0-9]*Z?)\b/g`

---

## 5. Error Handling and Reporting

### 5.1. Parse Errors
- Invalid syntax in expected output file
- Missing or malformed MongoDB constructors
- File system access errors

### 5.2. Comparison Errors
- Type mismatches (expected object, got array)
- Structure mismatches (different array lengths in strict mode)
- Property mismatches (missing required properties)

### 5.3. Error Context
Include in error reports:
- Path to the mismatched element (e.g., `"[0].users[2].name"`)
- Expected vs actual values
- Comparison mode (ordered/unordered, strict/lenient)

---

## 6. Cross-Language Implementation Guidelines

### 6.1. Core Interface Design
**All language implementations should provide these fundamental interfaces:**

```pseudocode
// Primary comparison engine (language-neutral interface)
compareDocuments(expectedContent: string, actualValue: object, options?: ComparisonOptions) -> ComparisonResult
compareValues(expectedValue: object, actualValue: object, options?: ComparisonOptions) -> ComparisonResult

// Result structure
ComparisonResult {
    isMatch: boolean
    errors: ComparisonError[]
}

// Configuration structure (consistent across all languages)
ComparisonOptions {
    comparisonType?: string           // "ordered", "unordered", or null/undefined
    ignoreFieldValues?: string[]     // Field names to ignore value differences
    timeout?: duration               // Language-appropriate timeout type
}
```

### 6.2. MongoDB Type Handling Strategy
**Cross-Language Type Mapping:**

```pseudocode
JavaScript: ObjectId('...') -> mongodb.ObjectId, Date('...') -> Date, Decimal128('...') -> mongodb.Decimal128
C#: ObjectId('...') -> MongoDB.Bson.ObjectId, Date('...') -> MongoDB.Bson.BsonDateTime, Decimal128('...') -> MongoDB.Bson.Decimal128
Java: ObjectId('...') -> org.bson.types.ObjectId, Date('...') -> java.util.Date, Decimal128('...') -> org.bson.types.Decimal128
Python: ObjectId('...') -> bson.ObjectId, Date('...') -> datetime.datetime, Decimal128('...') -> bson.Decimal128
Go: ObjectId('...') -> primitive.ObjectID, Date('...') -> time.Time, Decimal128('...') -> primitive.Decimal128
```

### 6.3. Safe Parsing Strategy
**DO NOT use code execution/eval in any language:**

```pseudocode
// Universal safe parsing approach:
function parseMongoDocumentSyntax(input: string) -> ParsedValue {
    // 1. Apply syntax transformations (regex replacements)
    normalized = applySyntaxTransformations(input)

    // 2. Parse as JSON with custom constructor handling
    jsonStructure = parseAsJSON(normalized)

    // 3. Post-process MongoDB constructors safely
    result = processMongoConstructors(jsonStructure)

    return result
}
```

### 6.4. Performance Considerations
```pseudocode
const PERFORMANCE_LIMITS = {
    MAX_ARRAY_SIZE_FOR_BACKTRACKING: 50,
    MAX_RECURSION_DEPTH: 100,
    MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024,  // 10MB
    MAX_DOCUMENTS_PER_FILE: 1000,
    DEFAULT_TIMEOUT_SECONDS: 30
}
```

---

## 7. Essential Test Cases

### 7.1. Basic Functionality
- **Type Matching**: Primitives, arrays, objects, null/undefined handling
- **MongoDB Types**: ObjectId, Decimal128, Date normalization and comparison
- **Array Strategies**: Ordered vs unordered comparison, backtracking for complex objects

### 7.2. Ellipsis Patterns
- **Property-Level**: `{_id: "..."}` matches any value, `{title: "Hello..."}` matches truncated strings
- **Array-Level**: `["..."]` matches any array, `[1, "...", 3]` matches with gaps
- **Object-Level**: `{"...": "..."}` matches any object structure
- **Global**: Standalone `...` lines allow omitted fields at all levels

### 7.3. Field Value Ignoring
- **Single/Multiple Fields**: `ignoreFieldValues: ["_id", "timestamp"]`
- **Nested Support**: Works at any object nesting level
- **Array Elements**: Ignoring applies within array element objects

### 7.4. Cross-Language Validation Cases
```javascript
// Test Case 1: MongoDB types → normalized strings
expected: {_id: ObjectId("507f..."), amount: Decimal128("123.45")}
actual:   {_id: "507f...", amount: "123.45"}
result:   true

// Test Case 2: Field value ignoring
expected: {_id: "any1", name: "John"}
actual:   {_id: "any2", name: "John"}
options:  {ignoreFieldValues: ["_id"]}
result:   true

// Test Case 3: Ellipsis array matching
expected: [1, "...", 4]
actual:   [1, 2, 3, 4]
result:   true

// Test Case 4: Truncated string matching
expected: {message: "Error: Connection failed..."}
actual:   {message: "Error: Connection failed after 3 retries"}
result:   true
```

---

## 8. Implementation Validation

### 8.1. Test Suite Requirements
- **Minimum 100+ test cases** covering all scenarios above
- **Cross-language compatibility tests** with identical expected results
- **Error condition coverage** with appropriate error messages

### 8.2. Compliance Checklist
Each language implementation should:
- [ ] Parse and normalize all MongoDB types correctly
- [ ] Handle all ellipsis pattern types
- [ ] Implement all array comparison strategies
- [ ] Support global ellipsis (omitted fields) mode
- [ ] Provide detailed error reporting with element paths
- [ ] Pass all cross-language validation test cases
- [ ] Handle edge cases and error conditions gracefully
- [ ] Maintain performance within acceptable bounds for large inputs

---

## 9. Implementation Roadmap

### 9.1. Priority Languages
**Short-Term (Immediate):** C#, Go, Java, Python
**Long-Term (Future):** C, C++, Kotlin, PHP, Ruby, Rust, Scala, TypeScript

### 9.2. Development Phases
**Phase 1 (Foundation):** Basic comparison, file parsing, simple ellipsis patterns
**Phase 2 (Advanced):** Complex ellipsis, MongoDB constructors, array strategies, performance optimization

### 9.3. Validation Strategy
- JavaScript implementation serves as canonical reference
- Shared test suite across all languages
- Cross-language result validation
- Performance benchmarking by language category
