    // Filter for items with 'write' in the name
    "name TEXT $0", "write"

    // Find items with 'write' but not 'tests' using '-'
    "name TEXT $0", "write -tests"

    // Find items starting with 'wri-' using '*'
    "name TEXT $0", "wri*"
