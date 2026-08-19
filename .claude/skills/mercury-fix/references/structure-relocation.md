# Pattern: structure_relocation (automation: full)

Content exists but lives where nobody lands. Apply the edit, then report it for review.

## Order matters

Do these in this order. If something fails partway, content must never have been deleted from the source page while absent from the target.

1. **Add the block to the target page first**, in a semantically appropriate location — inside the section that covers the topic, at the heading level its new surroundings require. Do not drop it at the end of the file because that is easiest.
2. Fix the heading level and its underline to match the new surroundings.
3. Re-wrap the moved prose to 72 characters.
4. **Then remove it from the source page.**
5. Leave a cross-link on the original page when the ticket asks for one.

Preserve RST directives and substitution markup verbatim through the move.

## Before you move anything

**Check whether it is an include.** If the content arrives via `.. include::`, moving the *directive* moves it for one page only; moving the *file contents* affects every page that includes it. Establish which you are doing and say so in your plan.

**Find inbound references** to any label inside the moved block:

```bash
grep -rn "<label>" content/<project>/source/
```

A label that moves between files still resolves, so usually nothing needs changing — but a label you delete or rename breaks every referring page, including pages you did not touch.

## After you move

Run `local-build-check`. It runs the real Snooty parser, and it specifically promotes "Target not found" errors in *unchanged* files to introduced when the diff touched the label they reference. That is the failure mode this pattern creates, and `./lint-docs.sh` will not catch it.

If the move empties or deletes a whole `.txt` page, `add-redirects` and `unified-toc` must both run before the change can be pushed. Say so in your report.
