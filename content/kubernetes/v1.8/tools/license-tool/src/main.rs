use std::fs;

mod constants;
mod entry;

use crate::constants::{LICENSES, TABLE_HEADER, UNKNOWN_LICENSE_ERR};
use crate::entry::Entry;

fn main() {
    let file = fs::read_to_string("licenses.csv").expect("licenses file missing");

    // Build the CSV reader
    let mut rdr = csv::ReaderBuilder::new()
        .has_headers(false) // don't skip first row
        .from_reader(file.as_bytes());

    // Create a vector of entries.
    let mut entries: Vec<Entry> = vec![];
    // Deserialize csv records and add to vector.
    for result in rdr.deserialize() {
        let entry: Entry = match result {
            Ok(s) => s,
            Err(_) => panic!(),
        };
        entries.push(entry);
    }

    // Check for unknown licenses
    let existing_licenses: Vec<String> = LICENSES.iter().map(|l| l.0.to_string()).collect();
    for entry in &entries {
        if !existing_licenses.contains(&entry.license) {
            panic!("{}", UNKNOWN_LICENSE_ERR);
        }
    }

    // For each license, output the corresponding header and list of entries.
    for (license, header) in LICENSES {
        println!("{header}\n");
        println!("{TABLE_HEADER}\n");

        for entry in &entries {
            if entry.license == license.to_string() {
                println!("{entry}");
            }
        }
    }
}
