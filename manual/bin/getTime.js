#!/usr/bin/node
/* getTime.js uses node to generate a recent timestamp and
 *    ISODate formatted string of the same time. You can then
 *    copy these values into the `timestamp` and `isodate` fields
 *    in snooty.toml to ensure that examples for commands like
 *    replSetGetStatus show recent dates and times.
 *
 *    To use, run the file with Node.js:
 *
 *    $ node bin/getTime.js
 *    Update the following lines in snooty.toml:
 *    timestamp = "Timestamp(1723762902, 1)"
 *    isodate = "ISODate(\"2024-08-15T23:01:42.773Z\")
 *
 *    Then, copy the return values into snooty.toml.
 *
 *    Author: Kenneth P. J. Dyer <kenneth.dyer@mongodb.com>
 *    Created: 2024-08-15
 *    Updated:
 */
const n = new Date();
const t = Math.floor(n / 1000);
const d = n.toISOString();
console.log("Update the following lines in snooty.toml:");
console.log("timestamp = \"Timestamp(%d, 1)\"", t);
console.log("isodate = \"ISODate(\\\"%s\\\")\"", d);
