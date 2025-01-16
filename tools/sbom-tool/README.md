# Requirements

Install [Rust](https://www.rust-lang.org/learn/get-started).

# Instructions

1. Download the SBOM (software bill of materials) for Ops Manager from here: https://parsley.mongodb.com/taskFile/mms_ops_manager_main_ssdlc_PACKAGE_SILK_SBOM_21ef545d4cdcde67d2eaa7f709e62a080db80cc6_24_05_30_14_41_10/0/Augmented%20SBOM?bookmarks=0,50069
   (This location may change in the future. Ask engineering for latest if you have questions.)  
   - Click *Details* -> *Raw* to downlaod the raw JSON. Name the file `sbom.json`.
2. Place `sbom.json` in `docs-ops-manager/tools/sbom-tool`.
3. Change to the tool directory: `cd docs-ops-manager/tools/sbom-tool/`.
4. Run `cargo run`
5. Copy to the output file (`out.rst`) to the appropriate section of `docs-ops-manager/source/reference/third-party-licenses.txt`.

# Troubleshooting

If you run into an error with `cargo run`, 
try adding the following text to `~/.carg/config`
(create this file if it does not exist):

```
[net]
git-fetch-with-cli = true
```
