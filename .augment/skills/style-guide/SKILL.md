---
name: style-guide
description: MongoDB documentation style rules. Apply when writing or editing rST documentation.
---

# Hard Rules
- **Line length**: Break lines at 72 characters
- **DO NOT** change existing rST formatting or directives
- **DO NOT** add new information when editing existing docs
- Fix typos and grammatical errors only

---

# rST Markup Formatting

Use the following markup styles when writing or editing documentation:

## `:guilabel:` — UI Elements
Use for buttons, menus, dialogs, tabs, checkboxes, fields, icons, pages, windows.
```rst
Click :guilabel:`Save`.
In the :guilabel:`Database Name` field, enter a name.
Select :guilabel:`Start > Control Panel`.
```

## `:kbd:` — Keyboard Shortcuts
```rst
Press :kbd:`Shift-G` and then press :kbd:`Enter`.
```

## Monospace `` `text` `` — Code-Related Text
- Commands, flags, arguments: `` `mongod` ``, `` `-t` ``
- Database/collection/file/directory names: `` `mytestdb` ``, `` `/etc/` ``
- Environment variables: `` `$PATH` ``
- Methods, elements, inline code: `` `startTransaction()` ``
- Error messages, paths

## *Italics* — Special Text
- Document titles: *MongoDB Manual*
- New terms on first use: *swappiness*
- Qualifiers: *(Optional)* Enter a name.

## **Bold** — User Input
- Non-clickable URLs/emails: **your.name@example.com**
- User GUI input: type **outlook**

---

# Titles and Headings

## AP Headline-Style Capitalization
Capitalize all words except: articles (a, an, the), conjunctions (and, but, or),
prepositions, "to" in infinitives. Always capitalize first and last word.

## Structure Rules
- Don't start with articles (a, an, the)
- Don't apply formatting in titles (no bold/italics/monospace)
- Don't stack headings — text must appear between them
- Limit to 2 heading levels when possible
- Place important words first (SEO)

## Title Structure by Page Type
| Type | Structure | Example |
|------|-----------|---------|
| Conceptual | Noun phrase | "How Monitoring Works" |
| Tutorial | Imperative verb | "Install MongoDB" |
| Reference | Plural noun | "Operators and Collectors" |

---

# Code Examples

Use file-based directives, not hard-coded inline code:
```rst
.. literalinclude:: /path/to/file.js
   :language: javascript

.. io-code-block::
   .. input:: /path/to/input.py
   .. output:: /path/to/output.txt
```

---

# Terminology

| Avoid | Use |
|-------|-----|
| admin | administrator |
| argument (CLI) | option |
| blacklist/whitelist | access list |
| date (for timestamps) | timestamp |
| higher/lower (versions) | later/earlier |
| i.e. | that is |
| e.g. | for example |
| master/slave | primary/secondary |
| menu item, menu option | menu command |
| user (for people) | customer |

## Client Library vs Driver
- **client library**: Use in TOC titles and headings
- **driver**: Use in body text (e.g., "MongoDB Java Driver")
- Don't use: "client drivers", "client connectors"

Prefer American English spelling.
