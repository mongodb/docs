.. list-table::
   :header-rows: 1

   * - Keyword
     - Type
     - Definition
     - Behavior

   * - bsonType
     - all types
     - string alias or array of string aliases
     - Accepts same :ref:`string aliases <document-type-available-types>` 
       used for the :query:`$type` operator

   * - enum
     - all types
     - array of values
     - Enumerates all possible values of the field

   * - type
     - all types
     - string or array of unique strings
     - Enumerates the possible JSON types of the field. Available types are 
       "object", "array", "number", "boolean", "string", and "null".

   * - allOf
     - all types
     - array of JSON Schema objects
     - Field must match all specified schemas

   * - anyOf
     - all types
     - array of JSON Schema objects
     - Field must match at least one of the specified schemas

   * - oneOf
     - all types
     - array of JSON Schema objects
     - Field must match exactly one of the specified schemas

   * - not
     - all types
     - a JSON Schema object
     - Field must not match the schema

   * - multipleOf
     - numbers
     - number
     - Field must be a multiple of this value

   * - maximum
     - numbers
     - number
     - Indicates the maximum value of the field

   * - exclusiveMaximum
     - numbers
     - boolean
     - If true and field is a number, ``maximum`` is an exclusive maximum.
       Otherwise, it is an inclusive maximum.

   * - minimum
     - numbers
     - number
     - Indicates the minimum value of the field

   * - exclusiveMinimum
     - numbers
     - boolean
     - If true, ``minimum`` is an exclusive minimum. Otherwise, it is an 
       inclusive minimum.

   * - maxLength
     - strings
     - integer
     - Indicates the maximum length of the field

   * - minLength
     - strings
     - integer
     - Indicates the minimum length of the field

   * - pattern
     - strings
     - string containing a regex
     - Field must match the regular expression

   * - maxProperties
     - objects
     - integer
     - Indicates the field's maximum number of properties

   * - minProperties
     - objects
     - integer
     - Indicates the field's minimum number of properties

   * - required
     - objects
     - array of unique strings
     - Object's property set must contain all the specified elements in the 
       array

   * - additionalProperties
     - objects
     - boolean or object
     - If ``true``, additional fields are allowed. If ``false``, they are not.
       If a valid JSON Schema object is specified, additional fields must 
       validate against the schema.

       Defaults to ``true``.

   * - properties
     - objects
     - object
     - A valid JSON Schema where each value is also a valid JSON Schema object

   * - patternProperties
     - objects
     - object
     - In addition to ``properties`` requirements, each property name of this
       object must be a valid regular expression

   * - dependencies
     - objects
     - object
     - Describes field or schema dependencies

   * - additionalItems
     - arrays
     - boolean or object
     - If an object, must be a valid JSON Schema

   * - items
     - arrays
     - object or array
     - Must be either a valid JSON Schema, or an array of valid JSON Schemas

   * - maxItems
     - arrays
     - integer
     - Indicates the maximum length of array
   
   * - minItems
     - arrays
     - integer
     - Indicates the minimum length of array
   
   * - uniqueItems
     - arrays
     - boolean
     - If true, each item in the array must be unique. Otherwise, no uniqueness 
       constraint is enforced. 

   * - title
     - N/A
     - string
     - A descriptive title string with no effect.

   * - description
     - N/A
     - string
     - A string that describes the schema and has no effect.
