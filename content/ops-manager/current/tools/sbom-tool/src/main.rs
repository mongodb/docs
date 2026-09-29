use std::fs::read_to_string;

use sbom::Component;

use crate::constants::{COLUMN_HEADERS, TABLE_HEADER};
use crate::sbom::Sbom;

mod constants;
mod fmt;
mod sbom;

fn main() {
    let file_path = "sbom.json".to_owned();
    let contents = read_to_string(file_path).expect("Couldn't find or load that file.");

    let sbom: Sbom = serde_json::from_str(&contents).expect("Error unmarshalling JSON");

    let mut output = String::new();
    output += TABLE_HEADER;
    output += "\n\n";
    output += COLUMN_HEADERS;
    output += "\n\n";

    let mut components: Vec<Component> = sbom.components;
    components.sort_by(|a, b| {
        a.clone()
            .name
            .unwrap()
            .to_lowercase()
            .cmp(&b.clone().name.unwrap().to_lowercase())
    });
    components.sort_by_key(|c| c.clone().licenses);

    for comp in &components {
        if comp.licenses.is_some() {
            output += &format!("{}", comp);
        }
    }

    // println!("{}", output);
    std::fs::write("out.rst", output).expect("Error writing output file.");
}
