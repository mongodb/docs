You will check if some text contains substitutions or source constants and update the text if it does.

1. Open the snooty.toml file.

Substitutions are under the [substitutions] section.
Source constants are under [constants].

They both use the following form:

substitution = "<some-text>"
source-constant = "<some-text>"

If some text matches <some-text> in snooty.toml, replace that text with the corresponding 
source constant or substitution in the following formatting. 
- Focus only on the plain text. 
- Ignore the :abbr: and the parenthetical text, any linked content, or additional formatting.

For example:
  - "Atlas" should be "|service|"
  - "Atlas Search" should be "|fts|"
  - "Atlas UI" should be replaced with "{+atlas-ui+}"
  - "AWS" should be "{+aws+}" 
  - "mongosh" should be "{+mongosh+}"
  - "Kubernetes" should be "|k8s|"

## Additional context on the different between the two:

| Replacement Method | Substitution | Source Constant |
|-------------------|--------------|----------------|
| Where you define | Inline in any file or snooty.toml | snooty.toml |
| How you define inline | `.. \|name\| replace:: replacement` | Not possible |
| How you define in snooty.toml | `[substitutions]`<br>`driver-short = "PyMongo"`<br>`driver-long = "PyMongo, the MongoDB synchronous Python driver"` | `[constants]`<br>`driver-short = "PyMongo"`<br>`driver-long = "PyMongo, the MongoDB synchronous Python driver"` |
| How you use | `\|name\|` | `{+name+}` |
| When processed | When converting from rST to HTML | Before converting from rST to HTML. Because of this, source constants work within URLs and roles while substitutions do not. |
| Can use inside markup | No | Yes |
