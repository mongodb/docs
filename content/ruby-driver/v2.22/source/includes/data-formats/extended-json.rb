# start-ex-json-read
require 'bson'

ex_json = '''[
    {"foo": [1, 2]},
    {"bar": {"hello": "world"}},
    {"code": {
    "$scope": {},
    "$code": "function x() { return 1; }"
    }},
    {"bin": {
    "$type": "80",
    "$binary": "AQIDBA=="
    }}
    ]'''

doc = BSON::ExtJSON.parse(ex_json)

puts doc.class
puts doc
# end-ex-json-read

# start-ex-json-write
require 'bson'

hash_array = [
    { "foo" => [1, 2] },
    { "bin" => BSON::Binary.new("\x01\x02\x03\x04", :user) },
    { "number" => BSON::Int64.new(42) }
]

json_string_canonical = hash_array.as_extended_json
json_string_relaxed = hash_array.as_extended_json(mode: :relaxed)
json_string_legacy = hash_array.as_extended_json(mode: :legacy)

puts "canonical:\t #{json_string_canonical}"
puts "relaxed:\t #{json_string_relaxed}"
puts "legacy:\t\t #{json_string_legacy}"
# end-ex-json-write