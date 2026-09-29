use std::fmt;

use crate::sbom::Component;
use iter_tools::Itertools;

// Example:
//
// * - `pikaday <https://www.npmjs.com/package/pikaday/v/1.8.2>`__
//   - Copyright © 2013-2014 David Bushell
//
impl fmt::Display for Component {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let name = self.name.clone().unwrap();

        // Get a URL for this component.
        // Prefer a github repo URL, but otherwise use any given URL.
        let mut url = String::new();
        let refs = self.clone().external_references;
        if refs.is_some() {
            // println!("{:#?}", refs.clone().unwrap());

            for r in refs.clone().unwrap() {
                if r.url.contains("https://github") {
                    url = r.url.replace("git+", "").replace(".git", "");
                } else {
                    url = r.url;
                }
            }
        }

        // Licenses
        let mut licenses: Vec<String> = vec![];
        let ls = self.clone().licenses;
        if ls.is_some() {
            for l in ls.unwrap() {
                let license = l.to_string();
                if license != "Other" && license != "NOASSERTION" {
                    licenses.push(license);
                }
            }
        }

        // Format copyright text into one line
        let mut copyright = self.copyright.clone().unwrap_or(String::from(""));
        copyright = copyright.replace('\n', "\n       ");

        // Here is where we actually create the string that will go into
        // the RST file, using the data from above.
        write!(
            f,
            "   * - `{} <{}>`__\n     - {}\n     - {}\n\n",
            name,
            url,
            licenses.iter().format(", "),
            copyright,
        )
    }
}
