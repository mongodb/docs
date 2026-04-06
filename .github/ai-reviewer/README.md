# AI Style Reviewer

AI-powered documentation reviewer that checks PRs for writing quality, style guide compliance, and clarity.

## How It Works

When triggered, the AI reviewer:
1. Fetches the PR diff
2. Analyzes changes against MongoDB style guidelines
3. Posts inline comments on issues found
4. Adds a summary comment

It uses Claude (Anthropic API) to understand context and provide actionable feedback.

---

## Triggering a Review

### Option 1: Add a Label

Add the `ai-review-style` label to any PR. The review runs automatically.

### Option 2: Comment Command

Comment `/ai-review-style` on a PR to trigger a review.

---

## What It Checks

| Category | Examples |
|----------|----------|
| **Writing Clarity** | Passive voice, complex sentences, ambiguous pronouns |
| **Terminology** | MongoDB-specific terms, consistent naming |
| **Style Guide** | Active voice, second person ("you"), sentence structure |
| **Nested Components** | Admonitions inside admonitions (always flagged) |
| **SEO** | Title/meta issues (only if PR touches them) |

---

## Example Output

### Inline Comment

> **Style**: Consider using active voice here.
> 
> **Current**: "The data is processed by the server"  
> **Suggested**: "The server processes the data"

### Summary Comment

> ## AI Style Review Summary
> 
> Found **2 issues** in this PR:
> - 1 style suggestion (line 45)
> - 1 clarity improvement (line 89)
> 
> These are suggestions — use your judgment on whether to apply them.

---

## Configuration

Settings are in `config.yml`:

| Setting | Default | Description |
|---------|---------|-------------|
| `trigger.label` | `ai-review-style` | Label that triggers review |
| `trigger.command` | `/ai-review-style` | Comment command to trigger |
| `feedback.granularity` | `minimal` | Only HIGH severity issues |
| `feedback.max_inline_comments` | `5` | Limit comments to avoid overload |
| `review.max_files` | `20` | Max files to review per PR |

---

## Feedback Granularity

| Level | What's Flagged |
|-------|----------------|
| `minimal` | Only HIGH severity (definite problems) |
| `balanced` | HIGH + MEDIUM severity |
| `detailed` | All issues including LOW |

Default is `minimal` to keep feedback actionable and avoid noise.

---

## Reference Files

The AI uses these files for context:

| File | Purpose |
|------|---------|
| `style-guide-reference.md` | Condensed MongoDB style guidelines |
| `seo-guidelines.md` | SEO best practices |
| `nested-components-guide.md` | Why nested admonitions are problematic |

---

## Requirements

- **GitHub Actions** (runs as a workflow)
- **`ANTHROPIC_API_KEY`** repository secret

---

## FAQ

**Will this block my PR?**  
No. The reviewer only posts comments — it never blocks merges.

**Is every suggestion mandatory?**  
No. These are AI suggestions. Use your judgment. Some may not apply to your context.

**Why only 5 inline comments max?**  
To avoid cognitive overload. The AI prioritizes the most important issues.

**Can I re-run the review?**  
Yes. Remove and re-add the `ai-review-style` label, or comment `/ai-review-style` again.

**What if I disagree with a suggestion?**  
Ignore it! The AI doesn't have full context. If you see repeated bad suggestions, let us know so we can improve the prompts.

---

## Files

```
.github/ai-reviewer/
├── README.md                  # This file
├── config.yml                 # Configuration
├── scripts/
│   └── review-docs.ts         # Main review script
├── style-guide-reference.md   # Style guidelines for AI
├── seo-guidelines.md          # SEO guidelines for AI
└── nested-components-guide.md # Nested component rules
```

---

## Contact

Questions or feedback? Contact: **Emet Ozar**
