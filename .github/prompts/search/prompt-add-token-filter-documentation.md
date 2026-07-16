# Prompt: Add New Token Filter Documentation to token-filters.txt

## Context
You are adding documentation for a new token filter to the Search
token filters documentation file located at:
`content/search/source/index/analyzers/token-filters.txt`

This prompt is a reusable template. Replace every `<placeholder>`
with values for the token filter you are documenting. Follow the
existing structure, style, and format of the file exactly.

## Placeholders
Fill in these values before you begin. Reuse them consistently
throughout the section and include files:

- `<filterName>`: camelCase filter name used in prose, the section
  heading, the ref label, and the `type` value (e.g.,
  `englishMinimalStemming`).
- `<filtername>`: lowercase form used in include file names (e.g.,
  `englishminimalstemming`).
- `<analyzerName>`: custom analyzer name used in the example (e.g.,
  `minimalStemmer`).
- `<fieldPath>`: field the example indexes and queries (e.g.,
  `text.en_US`).
- `<queryTerm>`: search term that demonstrates the filter (e.g.,
  `meeting`).

## Source Information
Gather and record these before writing:

- **JIRA Ticket**: `<jira-url>`
- **Engineering Description**: `<eng-description-url>`
- **Lucene Documentation**: `<lucene-doc-url>`
- **Release Date / Availability**: `<release-info>`

## Feature Details
- **Token Filter Name**: `<filterName>`
- **Purpose**: `<one-sentence purpose>`
- **Key Differentiator**: `<how this filter differs from similar
  existing filters>`

Verify all technical details against the JIRA ticket and Lucene
documentation before proceeding. If any detail cannot be confirmed,
stop and ask rather than making assumptions.

## Documentation Structure Requirements

### 1. Add to Token Filter Types List
Add the new token filter reference to the alphabetically sorted list
under the `Token Filter Types` heading (near the top of the file):

- Insert `- :ref:`<filterName>-tf-ref`` in its correct alphabetical
  position within the existing list.

### 2. Create Token Filter Section
Follow this exact structure based on existing token filters (see
`kStemming` and `porterStemming` for reference):

```rst
.. _<filterName>-tf-ref:

<filterName>
------------

[Description paragraph explaining what the token filter does and how
it works. The heading underline must match the heading length.]

Attributes
~~~~~~~~~~

It has the following attributes:

.. list-table::
   :widths: 12 12 11 55
   :header-rows: 1

   * - Name
     - Type
     - Required?
     - Description

   * - ``type``
     - string
     - yes
     - Human-readable label that identifies this token filter type.
       Value must be ``<filterName>``.

Example
~~~~~~~

[Example introduction paragraph describing the index definition.]

a. [First step of tokenization]
#. [Second step with token filters]

.. tabs-drivers::

   .. tab::
      :tabid: atlas-ui

      .. include:: /includes/index/analyzers/code-snippets/token-filters/atlas-ui/<filtername>_ui.rst

   .. tab::
      :tabid: shell

      .. literalinclude:: /includes/index/analyzers/code-snippets/token-filters/mongosh/<filtername>_mongosh.js
         :language: javascript
         :linenos:
         :copyable: true

[Query paragraph describing the search query.]

.. tabs-drivers::

   .. tab::
      :tabid: atlas-ui

      .. include:: /includes/index/analyzers/code-snippets/token-filters/atlas-ui/<filtername>_query_ui.rst

   .. tab::
      :tabid: shell

      .. include:: /includes/index/analyzers/code-snippets/token-filters/compass/<filtername>_query.rst

[Results explanation paragraph with tokens output.]

.. list-table::
   :header-rows: 1

   * - Document ID
     - Output Tokens

   * - ``_id: [id]``
     - [tokens list]
```

### 3. Create Include Files

You must create **FIVE** files for each token filter. All live under
`content/search/source/includes/index/analyzers/code-snippets/token-filters/`
in the `atlas-ui/`, `mongosh/`, and `compass/` subdirectories. Use the
lowercase `<filtername>` in file names.

#### 3.1 UI Index Definition File
**Location**: `.../token-filters/atlas-ui/<filtername>_ui.rst`

**Content Structure**:
```rst
.. tabs::

   .. tab:: Visual Editor
      :tabid: visual-editor

      .. |analyzer-name| replace:: ``<analyzerName>``
      .. |fts-tokenizer| replace:: :guilabel:`standard`
      .. |fts-token-filter-a| replace:: :guilabel:`lowercase`
      .. |fts-token-filter-b| replace:: :guilabel:`<filterName>`
      .. |minutes-collection-field| replace:: **<fieldPath>**
      .. |fts-field-type| replace:: **String**

      .. include:: /includes/index/analyzers/code-snippets/token-filters/atlas-ui/fts-token-filter-<filtername>-config.rst

   .. tab:: JSON Editor
      :tabid: json-editor

      Replace the default index definition with the following example:

      .. code-block:: json
         :copyable: true

         {
           "analyzer": "<analyzerName>",
           "mappings": {
             "dynamic": true
           },
           "analyzers": [
             {
               "name": "<analyzerName>",
               "tokenizer": {
                 "type": "standard"
               },
               "tokenFilters": [
                 {
                   "type": "lowercase"
                 },
                 {
                   "type": "<filterName>"
                 }
               ]
             }
           ]
         }
```

#### 3.2 Visual Editor Configuration File
**Location**: `.../token-filters/atlas-ui/fts-token-filter-<filtername>-config.rst`

This is a plain RST step list (not a YAML extract). It is included by
the Visual Editor tab in `<filtername>_ui.rst` and uses the
substitutions defined there. Adapt the number of `Add token filter`
steps if the filter uses more than the `lowercase` + `<filterName>`
pair, and add steps for any configuration options the filter supports.

**Content Structure**:
```rst
1. In the :guilabel:`Custom Analyzers` section, click :guilabel:`Add
   Custom Analyzer`.

#. Select the :guilabel:`Create Your Own` radio button and click
   :guilabel:`Next`.

#. Type |analyzer-name| in the :guilabel:`Analyzer Name` field.

#. Expand :guilabel:`Tokenizer` if it's collapsed.

#. Select |fts-tokenizer| from the dropdown.

#. Expand :guilabel:`Token Filters` and click :icon-fa5:`plus-circle`
   :guilabel:`Add token filter`.

#. Select |fts-token-filter-a| from the dropdown and click
   :guilabel:`Add token filter` to add the token filter to your
   custom analyzer.

#. Click :icon-fa5:`plus-circle` :guilabel:`Add token filter` to add
   another token filter.

#. Select |fts-token-filter-b| from the dropdown.

#. Click :guilabel:`Add token filter` to add the token filter to your
   custom analyzer.

#. Click :guilabel:`Add` to create the custom analyzer.

#. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
   Field Mapping` to apply the custom analyzer on
   the |minutes-collection-field| field.

#. Select |minutes-collection-field| from the :guilabel:`Field
   Name` dropdown and |fts-field-type| from the :guilabel:`Data
   Type` dropdown.

#. In the properties section for the data type, select |analyzer-name|
   from the :guilabel:`Index Analyzer` and :guilabel:`Search Analyzer`
   dropdowns.

#. Click :guilabel:`Add`, then :guilabel:`Save Changes`.
```

#### 3.3 MongoDB Shell Index Definition File
**Location**: `.../token-filters/mongosh/<filtername>_mongosh.js`

**Content Structure**:
```javascript
db.minutes.createSearchIndex(
  "default",
  {
    "analyzer": "<analyzerName>",
    "mappings": {
      "dynamic": true
    },
    "analyzers": [
      {
        "name": "<analyzerName>",
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": [
          {
            "type": "lowercase"
          },
          {
            "type": "<filterName>"
          }
        ]
      }
    ]
  }
)
```

#### 3.4 UI Query File
**Location**: `.../token-filters/atlas-ui/<filtername>_query_ui.rst`

**Content Structure**:
```rst
1. Click the :guilabel:`Query` button for your index.
#. Click :guilabel:`Edit Query` to edit the query.
#. Click on the query bar and select the database and collection.
#. Replace the default query with the following and click
   :guilabel:`Search`:

   .. io-code-block::
      :copyable: true

      .. input::
         :language: json

         {
           "$search": {
             "index": "default",
             "text": {
               "query": "<queryTerm>",
               "path": "<fieldPath>"
             }
           }
         }

      .. output::
         :language: js
         :emphasize-lines: 9

         SCORE: [score] _id:  "[docId]"
           [field1]: "[value1]"
           [field2]: Object
           [fieldPath]: "[fieldValue]"
```

**Notes**:
- `<queryTerm>` should demonstrate the filter's functionality.
- Include realistic output showing the matched document, and use
  `:emphasize-lines:` to highlight the term the filter matched.

#### 3.5 MongoDB Shell / Compass Query File
**Location**: `.../token-filters/compass/<filtername>_query.rst`

**Content Structure**:
```rst
.. io-code-block::
   :copyable: true

   .. input::
      :language: json

      db.minutes.aggregate([
        {
          "$search": {
            "index": "default",
            "text": {
              "query": "<queryTerm>",
              "path": "<fieldPath>"
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "title": 1,
            "<fieldPath>": 1
          }
        }
      ])

   .. output::
      :language: json

      [
        {
          _id: [docId],
          [fieldName]: "[fieldValue]"
        }
      ]
```

### 4. File Naming Conventions Summary
All include files use **lowercase** `<filtername>` in their names, in
these locations under
`content/search/source/includes/index/analyzers/code-snippets/token-filters/`:
- `atlas-ui/<filtername>_ui.rst`
- `atlas-ui/fts-token-filter-<filtername>-config.rst`
- `mongosh/<filtername>_mongosh.js`
- `atlas-ui/<filtername>_query_ui.rst`
- `compass/<filtername>_query.rst`

### 5. Style Guidelines
- Wrap all content at 72 characters per line
- Use `|fts|` substitution for "Atlas Search" in prose
- Reference the `:ref:`minutes <custom-analyzers-eg-coll>`` collection for examples
- Use ordered lists (`a.`, `#.`) for step-by-step procedures
- Use cross-references with `:ref:` for other token filters
- Use double backticks for inline code: ``<filterName>``
- Maintain consistent heading underline lengths (match heading text exactly)

### 6. Content Type Pattern
Follow the "Task + Reference" content type:
- Description: Brief explanation of what the filter does
- Attributes: Technical reference table
- Example: Practical demonstration with:
  - Index definition with custom analyzer
  - Query example
  - Results explanation with token output

### 7. Insertion Location
Insert the new section alphabetically among the existing token filter
sections, matching the order of the Token Filter Types list.

## Steps to Complete

### Step 1: Review Technical Details
- Review the JIRA ticket for feature specifications
- Review Lucene documentation for technical accuracy
- Identify the filter's purpose and unique characteristics
- Determine appropriate example data and query terms

### Step 2: Add Reference to Token Filter Types List
**File**: `content/search/source/index/analyzers/token-filters.txt`

**Action**: Add `- :ref:`<filterName>-tf-ref`` to the alphabetically
sorted list under the `Token Filter Types` heading.

### Step 3: Create Main Documentation Section
**File**: `content/search/source/index/analyzers/token-filters.txt`

**Action**: Insert the complete section with:
- Reference label: `.. _<filterName>-tf-ref:`
- Section heading with matching underline length
- Description paragraph (2-3 sentences explaining the filter's purpose
  and how it differs from similar filters)
- Attributes table
- Example with index definition and query
- Results explanation with token output table

**Location**: Alphabetically among the existing token filter sections.

**Tips**:
- Compare to similar filters like `kStemming` or `porterStemming` for
  structure
- Emphasize the filter's unique value (e.g., precision, specific use
  case)
- Use cross-references to related filters with `:ref:`

### Step 4: Create Include Files

Create all five required files in the correct locations, all under
`content/search/source/includes/index/analyzers/code-snippets/token-filters/`.

#### 4.1 Create UI Index Definition
**File**: `atlas-ui/<filtername>_ui.rst`

**Requirements**:
- Define substitution variables at the top
- Include Visual Editor tab that includes the config file
- Include JSON Editor tab with complete index definition
- Use `.. code-block:: json` with `:copyable: true`

#### 4.2 Create Visual Editor Configuration File
**File**: `atlas-ui/fts-token-filter-<filtername>-config.rst`

**Requirements**:
- Plain RST step list using the substitutions from the UI file
- Adjust the `Add token filter` steps to match the filter's config
- End with the field-mapping and save steps

#### 4.3 Create MongoDB Shell Index Definition
**File**: `mongosh/<filtername>_mongosh.js`

**Requirements**:
- Use `db.minutes.createSearchIndex()` syntax
- Match the JSON structure from the UI file
- Use the same `<analyzerName>` as the UI file

#### 4.4 Create UI Query File
**File**: `atlas-ui/<filtername>_query_ui.rst`

**Requirements**:
- Numbered steps for Atlas UI workflow
- Use `.. io-code-block::` with `.. input::` and `.. output::` sections
- Show realistic query and matching results
- Query term should demonstrate the filter's functionality

#### 4.5 Create MongoDB Shell / Compass Query File
**File**: `compass/<filtername>_query.rst`

**Requirements**:
- Use `db.minutes.aggregate()` syntax
- Include `$search` and `$project` stages
- Show output in JSON format with matching documents
- Results should match the UI query output

### Step 5: Verify Cross-References
Check that all references are correct:
- `.. _<filterName>-tf-ref:` label exists
- Include paths match actual file locations
- Config file `fts-token-filter-<filtername>-config.rst` exists and is
  referenced by the UI file
- All `:ref:` links use correct syntax and target existing labels

### Step 6: Run Linting
Execute the linters:
```bash
./lint-docs.sh all content/search/source/index/analyzers/token-filters.txt
```

Fix any reported issues:
- SEO issues (titles, descriptions, headings)
- Broken links (404 errors)
- RST syntax errors

### Step 7: Verify Style Compliance
- Line wrapping at 72 characters
- Consistent heading underline lengths
- Proper indentation in RST directives
- Use of `|fts|` substitution (not "Atlas Search")
- Double backticks for inline code
- Cross-references use `:ref:` not direct links

## Practical Tips

### Finding Similar Filters for Reference
Look at these existing filters for structural examples:
- `kStemming`: Similar stemming filter with simple attributes
- `porterStemming`: Another stemming filter with no configuration options
- `snowballStemming`: More complex with `stemmerName` parameter
- `lowercase`: Simple filter with just the type attribute

### Checking Your Work
Before submitting, verify:

1. **Alphabetical ordering**:
   - Reference link in Token Filter Types list
   - Main section placement in token-filters.txt

2. **Naming consistency**:
   - Section label: `<filterName>-tf-ref` (camelCase)
   - Section heading: `<filterName>` (camelCase)
   - Type value in attributes: `<filterName>` (camelCase)
   - Include file names: `<filtername>_*.rst` / `.js` (lowercase)
   - Config file ref: `fts-token-filter-<filtername>-config` (lowercase)

3. **Cross-references work**:
   - All `:ref:` links resolve
   - All include paths exist
   - The config file is referenced by the UI include file

4. **Line wrapping**:
   - No line exceeds 72 characters
   - Indentation preserved in wrapped lines
   - RST directives properly formatted

5. **Content accuracy**:
   - Description matches Lucene documentation
   - Examples demonstrate the filter's unique capability
   - Token output is realistic and correct

## Common Mistakes to Avoid

❌ **Don't**:
- Use "Atlas Search" in prose → Use `|fts|` substitution
- Create file names with camelCase → Use lowercase
- Forget to add the reference link in the list
- Skip the Visual Editor configuration file
- Copy examples without updating field names and values
- Add extra configuration options not in the spec

✅ **Do**:
- Follow existing patterns exactly
- Verify all five files are created
- Use realistic examples from the minutes collection
- Emphasize the filter's unique value proposition
- Cross-reference related filters
- Test that the config file reference resolves correctly

## Notes
- Do NOT add information beyond what's requested
- Do NOT modify frontmatter unless explicitly instructed
- Verify all technical details against the JIRA ticket before proceeding
- If any technical detail cannot be confirmed, stop and ask rather than making assumptions
- All five include files must be created for the documentation to work correctly
- The Visual Editor configuration file is required for the Visual Editor tab to display properly
