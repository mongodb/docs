/// Pairs of license strings (as they appear in the csv file) and the headers
/// we use in the RST file.
pub const LICENSES: &[(&str, &str)] = &[
    ("Apache-2.0", APACHE_HEADER),
    ("BSD-2-Clause", BSD2_HEADER),
    ("BSD-3-Clause", BSD3_HEADER),
    ("ISC", ISC_HEADER),
    ("MIT", MIT_HEADER),
    ("MPL-2.0", MPL_HEADER),
];

pub const TABLE_HEADER: &str = ".. list-table::
   :widths: 70 30
   :header-rows: 1

   * - Package
     - Version
";

const APACHE_HEADER: &str = "Apache License 2.0
------------------

License: :tldrl:`TL;DR <apache2>` | :osil:`Full Text <Apache-2.0>`";

const BSD2_HEADER: &str = ":abbr:`BSD (Berkeley Software Distribution)` 2-Clause
-----------------------------------------------------

License: :tldrl:`TL;DR <freebsd>` | :osil:`Full Text <BSD-2-Clause>`";

const BSD3_HEADER: &str = ":abbr:`BSD (Berkeley Software Distribution)` 3-Clause
-----------------------------------------------------

License: :tldrl:`TL;DR <bsd3>` | :osil:`Full Text <BSD-3-Clause>`";

const ISC_HEADER: &str = ":abbr:`ISC (Internet Systems Consortium)` License
-------------------------------------------------

License: :tldrl:`TL;DR <isc>` | :osil:`Full Text <ISC>`";

const MIT_HEADER: &str = ":abbr:`MIT (Massachusetts Institute of Technology)` License
-----------------------------------------------------------

License: :tldrl:`TL;DR <mit>` | :osil:`Full Text <MIT>`";

const MPL_HEADER: &str = ":abbr:`MPL (Mozilla Public License)` 2.0
----------------------------------------

License: :tldrl:`TL;DR <mpl-2.0>` | :osil:`Full Text <MPL-2.0>`";

pub const UNKNOWN_LICENSE_ERR: &str =
    "\n\nUnknown license!\n\nIf there is a new license, add it to the `LICENSES`
constant and add a new license header.\n\n";
