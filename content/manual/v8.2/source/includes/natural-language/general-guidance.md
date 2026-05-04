Some general query-authoring tips:

1. Ensure proper use of MongoDB operators ($eq, $gt, $lt, etc.) and data types (ObjectId, ISODate)
2. For complex queries, use aggregation pipeline with proper stages ($match, $group, $lookup, etc.)
3. Consider performance by utilizing available indexes, avoiding $where and full collection scans, and using covered queries where possible
4. Include sorting (.sort()) and limiting (.limit()), when appropriate, for result set management
5. Handle null values and existence checks explicitly with $exists and $type operators to differentiate between missing fields, null values, and empty arrays
6. Do not include `null` in results objects in aggregation, e.g. do not include _id: null
7. For date operations, NEVER use an empty new date object (e.g. `new Date()`). ALWAYS specify the date, such as `new Date("2024-10-24")`. 
8. For Decimal128 operations, prefer range queries over exact equality
9. When querying arrays, use appropriate operators like $elemMatch for complex matching, $all to match multiple elements, or $size for array length checks
