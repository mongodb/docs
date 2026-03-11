# SEO Guidelines for Documentation

These guidelines must be followed to maintain SEO quality and avoid recurring issues.

## Links
- **No 404s**: All links (internal and external) must be working
- Don't assume existing links work—verify them when touching a topic

## Titles (30-60 characters)
- Titles must be **30-60 characters** in length
- Don't use short topic titles
- See the Style Guide > Titles for additional guidelines

**Where to find in RST files:**
```rst
:title: Your Page Title Here
```
Or the first heading after metadata.

**Examples:**
- ❌ "JSON Schema" (11 chars) - TOO SHORT
- ❌ "Download All Files" (18 chars) - TOO SHORT  
- ✅ "Generate JSON Schema from Your Collections" (42 chars) - GOOD

## Titles & H1s: Uniqueness Required
- **No duplicate titles or H1s**, even between different GitHub repos
- Create unique titles and unique H1s
- Check the ToC label of the page for accuracy

## H1 Requirements
- **H1s are required**: Every page must have exactly one H1
- **Only one H1 per page** is allowed

## H2 Requirements
- No specific requirements
- H2s can be short
- H2s can be the same between repos and topics

## Meta Descriptions
- Must be **unique**
- Must be **150-200 characters** (not longer or shorter)
- Don't copy/paste existing meta descriptions
- Use AI to help generate unique descriptions

**Where to find in RST files:**
```rst
:description: Your meta description text here that should be 150-200 characters.
```
Or in a `.. meta::` directive.

**Examples:**
- ❌ 95 characters - TOO SHORT
- ❌ 250 characters - TOO LONG
- ✅ 165 characters - GOOD

## Low Content Pages
- Pages with **< 100 characters** should have `noindex` added
- Move `:ref:` directives to appropriate pages
- Add redirects where necessary
- Don't create low content pages
- Refactor and fold low content pages into other pages
- Auto-generated pages can be ignored

## Images

### PNG Images
- **Always specify `figwidth:<number>px`**
- Example: `:figwidth: 1144px`
- Get the pixel number from the HTML source in browser inspector

### SVG Images
- Must include `width` and `height` attributes
- Note: This guideline is under revision with DOP

## Nested Components
- **No nested components allowed**
- See the separate Nested Components Guidelines document for detailed rules
- This is a HIGH priority issue when found
