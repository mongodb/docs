When input types are mixed, |operatorName| promotes the smaller input 
type to the larger of the two. A type is considered larger when it 
represents a wider range of values. The order of numeric types from 
smallest to largest is: integer → long → double → decimal

The larger of the input types also determines the result type unless 
the operation overflows and is beyond the range represented by that 
larger data type. In cases of overflow, |operatorName| promotes the 
result according to the following order:

- If the larger input type is :bsontype:`integer <Int32>`, the result type 
  is promoted to :bsontype:`long <Int64>`.

- If the larger input type is :bsontype:`long <Int64>`, the result type is 
  promoted to :bsontype:`double <Double>`.

- If the larger type is :bsontype:`double <Double>` or 
  :bsontype:`decimal <Decimal128>`, the overflow result is represented 
  as + or - infinity. There is no type promotion of the result.