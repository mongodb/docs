# RST forms for Mercury mismatch fixes

Format-specific snippets, separated from the pattern guidance in `../references/` so a future MDX equivalent can sit alongside as `mdx.md` without rewriting the recipes.

The repo's general RST rules live in `.claude/rules/rst-conventions.md` and CLAUDE.md. Only forms specific to these fixes are here.

## Renamed heading

The underline must match the heading length exactly, and must be at the same level the surrounding structure uses.

```rst
Run a Combined Semantic and Lexical Search Using $rankFusion
------------------------------------------------------------
```

### Headings containing a source constant

Match the underline to the **rendered** length, not the raw markup. `{+mongosh+}` renders as `mongosh`, so:

```rst
{+mongosh+} Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~
```

That heading renders as `mongosh Configuration` — 21 characters — so the underline is 21 tildes, not the 25 characters of the literal source text. `.claude/skills/fix-seo/assets/rst.md` documents how to count visible length, including role-stripping.

Note a known inconsistency in the repo's own guidance: `.claude/skills/release-notes-base/references/rst-formatting.md` says `|pipe|` substitutions match the *raw* source length while `{+curly+}` constants match the *rendered* length. Copy the convention used by neighbouring headings in the file you are editing, and flag the discrepancy rather than assuming.

## Note lifted out of a table

Placed immediately below the table it came from, above the next section label, and deleted from the table cell in the same edit.

```rst
.. note::

   The ``compact`` command does not block :ref:`crud` operations on the
   database it is compacting.
```

## Negative or limitation callout

State the limitation, then the alternative.

```rst
.. note::

   {+flex-clusters+} do not support private networking. To use private
   networking, upgrade to a dedicated cluster.
```

## Cross-link with the reason first

```rst
To learn how to find the control plane IP addresses, see
:ref:`atlas-control-plane-ips`.
```

Not `See :ref:\`atlas-control-plane-ips\` to learn how to find ...`.

## Scaffolded procedure

Structure only; the writer supplies each step's content.

```rst
.. procedure::
   :style: normal

   .. step:: TODO(DOCSP-XXXXX): Writer to supply the first action.

   .. step:: TODO(DOCSP-XXXXX): Writer to supply the second action.
```

## Unverified-fact marker

Always carry the ticket key so the gap is traceable.

```rst
.. TODO(DOCSP-XXXXX): Writer to confirm the exact retry interval.
```
