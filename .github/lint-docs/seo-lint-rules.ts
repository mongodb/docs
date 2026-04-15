/**
 * SEO Linter - Core Rules
 * 
 * Pure functions that take content and filename, return issues.
 * No I/O, no side effects - can be used by CLI or GitHub Actions.
 * 
 * Supports: RST (.rst, .txt), Markdown (.md), MDX (.mdx)
 */

// =============================================================================
// TYPES
// =============================================================================

export type Severity = 'error' | 'warning';
export type FileFormat = 'rst' | 'md' | 'mdx';

export interface LintIssue {
  file: string;
  line: number;
  rule: string;
  severity: Severity;
  message: string;
  suggestion: string;
  current?: string;
}

interface TitleInfo {
  title: string;
  line: number;
  format: 'rst' | 'yaml' | 'frontmatter' | 'h1' | 'md-h1';
}

interface DescInfo {
  desc: string;
  line: number;
  format: 'rst' | 'meta-directive' | 'yaml' | 'frontmatter' | 'meta';
}

interface HeadingInfo {
  text: string;
  lineNum: number;
  level: number;
}

// =============================================================================
// UTILITIES
// =============================================================================

function findLineNumber(content: string, searchString: string): number {
  const index = content.indexOf(searchString);
  if (index === -1) return 1;
  
  const upToMatch = content.substring(0, index);
  return upToMatch.split('\n').length;
}

/**
 * Calculate line number from a known character index
 * (more accurate than findLineNumber when the same string appears multiple times)
 */
function lineNumberFromIndex(content: string, index: number): number {
  if (index < 0) return 1;
  const upToMatch = content.substring(0, index);
  return upToMatch.split('\n').length;
}

function detectFileFormat(filename: string): FileFormat {
  if (filename.endsWith('.mdx')) return 'mdx';
  if (filename.endsWith('.md')) return 'md';
  return 'rst'; // .rst, .txt default to RST
}

function isMarkdown(filename: string): boolean {
  const format = detectFileFormat(filename);
  return format === 'md' || format === 'mdx';
}

/**
 * Check if a file is an include file (fragment that gets pulled into other pages).
 * Include files don't need titles, meta descriptions, or H1 headings.
 */
function isIncludeFile(filename: string): boolean {
  const normalizedPath = filename.replace(/\\/g, '/').toLowerCase();
  return normalizedPath.includes('/includes/') || normalizedPath.includes('/include/');
}

/**
 * Agent skills and flows under .github/agents/ are internal tooling,
 * not published docs. Skip all checks to avoid noise.
 */
function isAgentToolingFile(filename: string): boolean {
  const normalizedPath = filename.replace(/\\/g, '/').toLowerCase();
  return normalizedPath.includes('.github/agents/');
}

// =============================================================================
// TITLE CHECKS
// =============================================================================

function extractTitle(content: string, filename: string): TitleInfo | null {
  // 1. Try YAML frontmatter block first (works for all formats)
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const fmContent = frontmatterMatch[1];
    // Handle quoted strings (single or double quotes)
    let match = fmContent.match(/^title:\s*"([^"]+)"\s*$/m);
    if (match) return { title: match[1].trim(), line: findLineNumber(content, match[0]), format: 'frontmatter' };
    
    match = fmContent.match(/^title:\s*'([^']+)'\s*$/m);
    if (match) return { title: match[1].trim(), line: findLineNumber(content, match[0]), format: 'frontmatter' };
    
    // Handle unquoted strings
    match = fmContent.match(/^title:\s*([^"'\n][^\n]*)$/m);
    if (match) return { title: match[1].trim(), line: findLineNumber(content, match[0]), format: 'frontmatter' };
  }
  
  // 2. Try standalone YAML: title: "..." or title: '...' or title: ...
  let match = content.match(/^title:\s*"([^"]+)"\s*$/m);
  if (match) return { title: match[1].trim(), line: findLineNumber(content, match[0]), format: 'yaml' };
  
  match = content.match(/^title:\s*'([^']+)'\s*$/m);
  if (match) return { title: match[1].trim(), line: findLineNumber(content, match[0]), format: 'yaml' };
  
  match = content.match(/^title:\s*([^"'\n][^\n]*)$/m);
  if (match) return { title: match[1].trim(), line: findLineNumber(content, match[0]), format: 'yaml' };
  
  // 3. Try RST format: :title:
  match = content.match(/^:title:\s*(.+)$/m);
  if (match) return { title: match[1].trim(), line: findLineNumber(content, match[0]), format: 'rst' };
  
  // 4. For MD/MDX: Try # H1 heading
  if (isMarkdown(filename)) {
    match = content.match(/^#\s+(.+)$/m);
    if (match) return { title: match[1].trim(), line: findLineNumber(content, match[0]), format: 'md-h1' };
  }
  
  // 5. For RST: Try H1 heading (text followed by === underline)
  if (!isMarkdown(filename)) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();
      const nextLine = lines[i + 1];
      
      if (line.length > 0 && /^=+$/.test(nextLine) && nextLine.length >= line.length) {
        return { title: line, line: i + 1, format: 'h1' };
      }
    }
  }
  
  return null;
}

function checkTitle(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const isMd = isMarkdown(filename);
  
  const titleInfo = extractTitle(content, filename);
  
  if (!titleInfo) {
    // Check if page has substantial content (should have a title)
    const hasHeading = isMd 
      ? /^#+\s+.+$/m.test(content)
      : /^[^\n]+\n[=\-~]+$/m.test(content);
    const hasSubstantialContent = content.length > 200;
    
    if (hasHeading || hasSubstantialContent) {
      const suggestion = isMd
        ? 'Add title via YAML frontmatter (title: "...") or # H1 heading'
        : 'Add title via :title: directive, YAML frontmatter, or === heading';
      
      issues.push({
        file: filename,
        line: 1,
        rule: 'seo-title-missing',
        severity: 'error',
        message: 'No title found (required for content pages)',
        suggestion
      });
    }
    return issues;
  }
  
  const { title, line } = titleInfo;
  
  if (/\b(null|undefined)\b/i.test(title)) {
    issues.push({
      file: filename,
      line: line,
      rule: 'seo-title-invalid',
      severity: 'error',
      message: 'Title contains "null" or "undefined"',
      current: title,
      suggestion: 'Replace with actual title text'
    });
  }
  
  const len = title.length;
  
  // Minimum is 15 chars because MongoDB appends ~18-35 chars of branding to titles
  // (e.g., " | MongoDB Documentation"), making the final title longer in search results
  // Example: "Install MongoDB" (15 chars) is perfectly valid
  if (len < 15) {
    issues.push({
      file: filename,
      line: line,
      rule: 'seo-title-length',
      severity: 'error',
      message: `Title is ${len} characters (at least 15 required)`,
      current: title,
      suggestion: `Expand title to at least 15 characters`
    });
  } else if (len > 60) {
    issues.push({
      file: filename,
      line: line,
      rule: 'seo-title-length',
      severity: 'error',
      message: `Title is ${len} characters (maximum 60 allowed)`,
      current: title,
      suggestion: `Shorten title to 15-60 characters`
    });
  }
  
  return issues;
}

// =============================================================================
// META DESCRIPTION CHECKS
// =============================================================================

function extractMetaDescription(content: string, filename: string): DescInfo | null {
  // 1. Try YAML frontmatter block first (works for all formats)
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const fmContent = frontmatterMatch[1];
    // Handle quoted strings (single or double quotes)
    let match = fmContent.match(/^description:\s*"([^"]+)"\s*$/m);
    if (match) return { desc: match[1].trim(), line: findLineNumber(content, match[0]), format: 'frontmatter' };
    
    match = fmContent.match(/^description:\s*'([^']+)'\s*$/m);
    if (match) return { desc: match[1].trim(), line: findLineNumber(content, match[0]), format: 'frontmatter' };
    
    // Handle unquoted strings
    match = fmContent.match(/^description:\s*([^"'\n][^\n]*)$/m);
    if (match) return { desc: match[1].trim(), line: findLineNumber(content, match[0]), format: 'frontmatter' };
  }
  
  // 2. Try standalone YAML: description: "..." or description: '...' or description: ...
  let match = content.match(/^description:\s*"([^"]+)"\s*$/m);
  if (match) return { desc: match[1].trim(), line: findLineNumber(content, match[0]), format: 'yaml' };
  
  match = content.match(/^description:\s*'([^']+)'\s*$/m);
  if (match) return { desc: match[1].trim(), line: findLineNumber(content, match[0]), format: 'yaml' };
  
  match = content.match(/^description:\s*([^"'\n][^\n]*)$/m);
  if (match) return { desc: match[1].trim(), line: findLineNumber(content, match[0]), format: 'yaml' };
  
  // 3. Try RST format: :description:
  match = content.match(/^:description:\s*(.+)$/m);
  if (match) return { desc: match[1].trim(), line: findLineNumber(content, match[0]), format: 'rst' };
  
  // 4. Try RST meta directive (handles :description: anywhere in the meta block)
  // First, find the meta directive block
  const metaBlockMatch = content.match(/\.\.\s+meta::([\s\S]*?)(?=\n\S|\n\n\S|$)/);
  if (metaBlockMatch) {
    const metaBlock = metaBlockMatch[0];
    const descMatch = metaBlock.match(/:description:\s*(.+)/);
    if (descMatch) {
      return { desc: descMatch[1].trim(), line: findLineNumber(content, ':description:'), format: 'meta-directive' };
    }
  }
  
  // 5. Try meta_description variant
  match = content.match(/^:?meta_description:\s*["']?([^"'\n]+)["']?\s*$/m);
  if (match) return { desc: match[1].trim(), line: findLineNumber(content, match[0]), format: 'meta' };
  
  return null;
}

function checkMetaDescription(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const isMd = isMarkdown(filename);
  
  const descInfo = extractMetaDescription(content, filename);
  
  if (!descInfo) {
    const hasHeading = isMd
      ? /^#+\s+.+$/m.test(content)
      : /^[^\n]+\n[=\-~]+$/m.test(content);
    const hasSubstantialContent = content.length > 200;
    
    if (hasHeading || hasSubstantialContent) {
      const suggestion = isMd
        ? 'Add description via YAML frontmatter (description: "...")'
        : 'Add description via :description: directive or YAML frontmatter';
      
      issues.push({
        file: filename,
        line: 1,
        rule: 'seo-meta-missing',
        severity: 'error',
        message: 'No meta description found (required for content pages)',
        suggestion
      });
    }
    return issues;
  }
  
  const { desc, line } = descInfo;
  
  if (/\b(null|undefined)\b/i.test(desc)) {
    issues.push({
      file: filename,
      line: line,
      rule: 'seo-meta-invalid',
      severity: 'error',
      message: 'Meta description contains "null" or "undefined"',
      current: desc.substring(0, 50) + '...',
      suggestion: 'Replace with actual description text'
    });
  }
  
  const len = desc.length;
  
  if (len < 150) {
    issues.push({
      file: filename,
      line: line,
      rule: 'seo-meta-length',
      severity: 'error',
      message: `Meta description is ${len} characters (minimum 150 required)`,
      current: desc.substring(0, 50) + (desc.length > 50 ? '...' : ''),
      suggestion: `Expand description to 150-200 characters`
    });
  } else if (len > 200) {
    issues.push({
      file: filename,
      line: line,
      rule: 'seo-meta-length',
      severity: 'error',
      message: `Meta description is ${len} characters (maximum 200 allowed)`,
      current: desc.substring(0, 50) + '...',
      suggestion: `Shorten description to 150-200 characters`
    });
  }
  
  return issues;
}

// =============================================================================
// HEADING STRUCTURE CHECKS
// =============================================================================

function extractHeadings(content: string, filename: string): HeadingInfo[] {
  const headings: HeadingInfo[] = [];
  const lines = content.split('\n');
  
  if (isMarkdown(filename)) {
    // MD/MDX: # H1, ## H2, ### H3, etc.
    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        headings.push({
          text: match[2].trim(),
          lineNum: i + 1,
          level: match[1].length
        });
      }
    }
  } else {
    // RST: Underline-based headings
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const prevLine = lines[i - 1];
      
      // H1: ===
      if (/^=+$/.test(line) && prevLine.trim().length > 0 && line.length >= prevLine.trim().length) {
        headings.push({ text: prevLine.trim(), lineNum: i, level: 1 });
      }
      // H2: ---
      else if (/^-+$/.test(line) && prevLine.trim().length > 0 && line.length >= prevLine.trim().length) {
        headings.push({ text: prevLine.trim(), lineNum: i, level: 2 });
      }
      // H3: ~~~
      else if (/^~+$/.test(line) && prevLine.trim().length > 0 && line.length >= prevLine.trim().length) {
        headings.push({ text: prevLine.trim(), lineNum: i, level: 3 });
      }
    }
  }
  
  return headings;
}

function checkH1(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const isMd = isMarkdown(filename);
  const headings = extractHeadings(content, filename);
  const h1s = headings.filter(h => h.level === 1);
  
  if (h1s.length === 0) {
    const suggestion = isMd
      ? 'Add an H1 heading with # Title'
      : 'Add a main heading with === underline';
    
    issues.push({
      file: filename,
      line: 1,
      rule: 'structure-h1-required',
      severity: 'error',
      message: 'No H1 heading found (required)',
      suggestion
    });
  } else if (h1s.length > 1) {
    const suggestion = isMd
      ? 'Use ## for subsequent sections (only one # allowed)'
      : 'Use H2 (---) for subsequent sections';
    
    issues.push({
      file: filename,
      line: h1s[1].lineNum,
      rule: 'structure-h1-single',
      severity: 'error',
      message: `Multiple H1 headings found (${h1s.length}). Only one allowed.`,
      current: h1s.map(h => h.text).join(', '),
      suggestion
    });
  }
  
  if (h1s.length > 0) {
    const h1 = h1s[0];
    const len = h1.text.length;
    
    if (len < 10) {
      issues.push({
        file: filename,
        line: h1.lineNum,
        rule: 'structure-h1-length',
        severity: 'warning',
        message: `H1 is ${len} characters (minimum 10 recommended)`,
        current: h1.text,
        suggestion: 'Expand H1 to be more descriptive'
      });
    } else if (len > 70) {
      issues.push({
        file: filename,
        line: h1.lineNum,
        rule: 'structure-h1-length',
        severity: 'warning',
        message: `H1 is ${len} characters (maximum 70 recommended)`,
        current: h1.text,
        suggestion: 'Shorten H1 to 70 characters or less'
      });
    }
  }
  
  return issues;
}

function checkH2BeforeH1(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const isMd = isMarkdown(filename);
  const headings = extractHeadings(content, filename);
  
  const firstH1 = headings.find(h => h.level === 1);
  const firstH2 = headings.find(h => h.level === 2);
  
  if (firstH2 && (!firstH1 || firstH2.lineNum < firstH1.lineNum)) {
    const suggestion = isMd
      ? 'Add an H1 heading (# Title) before any ## headings'
      : 'Add an H1 heading (=== underline) before any H2 headings';
    
    issues.push({
      file: filename,
      line: firstH2.lineNum,
      rule: 'structure-h2-before-h1',
      severity: 'error',
      message: 'H2 appears before H1 (bad document structure)',
      current: firstH2.text,
      suggestion
    });
  }
  
  return issues;
}

// =============================================================================
// IMAGE CHECKS
// =============================================================================

interface ImageInfo {
  src: string;
  alt?: string;
  line: number;
  type: 'rst-figure' | 'rst-image' | 'md-image' | 'mdx-image';
}

function extractImages(content: string, filename: string): ImageInfo[] {
  const images: ImageInfo[] = [];
  
  if (isMarkdown(filename)) {
    // MD: ![alt](src) or ![alt](src "title")
    const mdImageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    let match;
    while ((match = mdImageRegex.exec(content)) !== null) {
      images.push({
        src: match[2],
        alt: match[1] || undefined,
        line: findLineNumber(content, match[0]),
        type: 'md-image'
      });
    }
    
    // MDX: <Image src="..." alt="..." /> or <img src="..." alt="..." />
    const mdxImageRegex = /<(?:Image|img)\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
    while ((match = mdxImageRegex.exec(content)) !== null) {
      const altMatch = match[0].match(/alt=["']([^"']+)["']/i);
      images.push({
        src: match[1],
        alt: altMatch ? altMatch[1] : undefined,
        line: findLineNumber(content, match[0]),
        type: 'mdx-image'
      });
    }
  } else {
    // RST: .. figure:: and .. image::
    const rstImageRegex = /\.\.\s+(figure|image)::\s+(\S+)/gi;
    let match;
    while ((match = rstImageRegex.exec(content)) !== null) {
      const afterMatch = content.substring(match.index, match.index + 500);
      const nextLines = afterMatch.split('\n').slice(0, 8).join('\n');
      const altMatch = nextLines.match(/:alt:\s*(.+)/i);
      
      images.push({
        src: match[2],
        alt: altMatch ? altMatch[1].trim() : undefined,
        line: findLineNumber(content, match[0]),
        type: match[1].toLowerCase() === 'figure' ? 'rst-figure' : 'rst-image'
      });
    }
  }
  
  return images;
}

function checkImageAlt(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const images = extractImages(content, filename);
  const isMd = isMarkdown(filename);
  
  for (const img of images) {
    if (!img.alt || img.alt.trim() === '') {
      const suggestion = isMd
        ? img.type === 'mdx-image'
          ? 'Add alt="Descriptive text" to the Image component'
          : 'Add alt text: ![Descriptive text](src)'
        : 'Add :alt: Descriptive text for the image';
      
      issues.push({
        file: filename,
        line: img.line,
        rule: 'image-alt-missing',
        severity: 'warning',
        message: 'Image missing alt text (important for accessibility and SEO)',
        current: img.src,
        suggestion
      });
    }
  }
  
  return issues;
}

function checkPngFigwidth(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  
  // Only applies to RST
  if (isMarkdown(filename)) return issues;
  
  const figureRegex = /\.\.\s+(figure|image)::\s+(\S+\.png)/gi;
  let match;
  
  while ((match = figureRegex.exec(content)) !== null) {
    const lineNum = findLineNumber(content, match[0]);
    const afterMatch = content.substring(match.index, match.index + 500);
    
    if (!/:figwidth:/i.test(afterMatch.split('\n').slice(0, 5).join('\n'))) {
      issues.push({
        file: filename,
        line: lineNum,
        rule: 'image-png-figwidth',
        severity: 'error',
        message: `PNG image missing :figwidth: attribute`,
        current: match[2],
        suggestion: 'Add :figwidth: <number>px (get px from browser inspector)'
      });
    }
  }
  
  return issues;
}

function checkSvgDimensions(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const images = extractImages(content, filename);
  const isMd = isMarkdown(filename);
  
  const svgImages = images.filter(img => img.src.toLowerCase().endsWith('.svg'));
  
  for (const img of svgImages) {
    if (isMd) {
      // For MD/MDX, check if using MDX component with width/height
      if (img.type === 'mdx-image') {
        // MDX Image components should have width and height
        const imgMatch = content.substring(
          content.indexOf(img.src) - 100,
          content.indexOf(img.src) + img.src.length + 50
        );
        const hasWidth = /width=/i.test(imgMatch);
        const hasHeight = /height=/i.test(imgMatch);
        
        if (!hasWidth || !hasHeight) {
          const missing: string[] = [];
          if (!hasWidth) missing.push('width');
          if (!hasHeight) missing.push('height');
          
          issues.push({
            file: filename,
            line: img.line,
            rule: 'image-svg-dimensions',
            severity: 'warning',
            message: `SVG image missing ${missing.join(' and ')} attribute(s)`,
            current: img.src,
            suggestion: 'Add width={...} and height={...} props to Image component'
          });
        }
      }
      // For plain MD ![](svg), we can't easily specify dimensions - just warn
    } else {
      // RST: :height: is not a valid option for figure or image in our
      // snooty build. Check for :figwidth: or :width: instead.
      const afterMatch = content.substring(content.indexOf(img.src), content.indexOf(img.src) + 500);
      const nextLines = afterMatch.split('\n').slice(0, 5).join('\n');
      
      const hasFigwidth = /:figwidth:/i.test(nextLines);
      const hasWidth = /:width:/i.test(nextLines);
      
      if (!hasFigwidth && !hasWidth) {
        const suggestion = img.type === 'rst-figure'
          ? 'Add :figwidth: <value> to the figure directive'
          : 'Add :width: <value> to the image directive';
        
        issues.push({
          file: filename,
          line: img.line,
          rule: 'image-svg-dimensions',
          severity: 'error',
          message: `SVG ${img.type === 'rst-figure' ? 'figure' : 'image'} missing dimension attribute`,
          current: img.src,
          suggestion
        });
      }
    }
  }
  
  return issues;
}

// =============================================================================
// STRUCTURE CHECKS
// =============================================================================

/**
 * Check for problematic nesting patterns.
 * 
 * "Container components" are directives that create visual boxes/sections:
 * - Callouts: note, tip, warning, important, caution, danger, seealso, admonition, example
 * - Tabs: tabs, tabs-pillbox, tabs-selector
 * - Tables: list-table, csv-table
 * 
 * Rule: Container components should not be nested inside other container components.
 * Exception: Tabs CAN contain callouts and tables (tabs are content organizers).
 * 
 * NOT flagged: Callouts inside composables like selected-content, procedure steps, etc.
 * These are content flow directives, not visual containers.
 */
function checkNestedComponents(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const isMd = isMarkdown(filename);
  
  if (isMd) {
    // MDX: Check for nested container components
    const mdxContainers = ['Callout', 'Admonition', 'Note', 'Warning', 'Tip', 'Important', 'Caution', 'Example', 'Tabs', 'Table'];
    const mdxPattern = mdxContainers.map(a => `<${a}[^>]*>`).join('|');
    const mdxRegex = new RegExp(`(${mdxPattern})`, 'gi');
    
    const matches = [...content.matchAll(mdxRegex)];
    for (const match of matches) {
      const startIndex = match.index!;
      
      const tagName = match[0].match(/<(\w+)/)?.[1];
      if (!tagName) continue;
      
      const closeTagRegex = new RegExp(`</${tagName}>`, 'i');
      const afterOpen = content.substring(startIndex + match[0].length);
      const closeMatch = afterOpen.match(closeTagRegex);
      
      if (closeMatch && closeMatch.index !== undefined) {
        const innerContent = afterOpen.substring(0, closeMatch.index);
        const innerMatch = innerContent.match(new RegExp(mdxPattern, 'i'));
        if (innerMatch) {
          const nestedIndex = startIndex + match[0].length + innerContent.indexOf(innerMatch[0]);
          const nestedLineNum = lineNumberFromIndex(content, nestedIndex);
          const nestedTagName = innerMatch[0].match(/<(\w+)/)?.[1] || 'component';
          issues.push({
            file: filename,
            line: nestedLineNum,
            rule: 'nested-component',
            severity: 'error',
            message: `${nestedTagName} nested inside ${tagName} (not allowed)`,
            suggestion: 'Move the nested component outside or restructure content'
          });
        }
      }
    }
    
  } else {
    // RST: Container component directives
    const callouts = ['note', 'tip', 'warning', 'important', 'caution', 'danger', 'seealso', 'admonition', 'example'];
    const tabDirectives = ['tabs', 'tabs-pillbox', 'tabs-selector'];
    const tableDirectives = ['list-table', 'csv-table'];
    
    // All container types for detection
    const allContainers = [...callouts, ...tabDirectives, ...tableDirectives];
    
    const lines = content.split('\n');
    
    // Track all container spans
    interface ContainerSpan {
      type: string;
      category: 'callout' | 'tabs' | 'table';
      startLine: number;
      endLine: number;
      indentLevel: number;
    }
    
    const containerSpans: ContainerSpan[] = [];
    
    // Find all container directive spans
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Match any container directive
      const containerMatch = line.match(new RegExp(`^(\\s*)\\.\\. (${allContainers.join('|')})(::|-[a-z]*::)`, 'i'));
      
      if (containerMatch) {
        const indentLevel = containerMatch[1].length;
        const directiveType = containerMatch[2].toLowerCase();
        
        // Determine category
        let category: 'callout' | 'tabs' | 'table';
        if (callouts.includes(directiveType)) {
          category = 'callout';
        } else if (tabDirectives.includes(directiveType)) {
          category = 'tabs';
        } else {
          category = 'table';
        }
        
        // Find where this container ends
        let endLine = i;
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j];
          if (nextLine.trim() === '') {
            endLine = j;
            continue;
          }
          const nextIndent = nextLine.match(/^(\s*)/)?.[1].length ?? 0;
          if (nextIndent <= indentLevel && nextLine.trim() !== '') {
            break;
          }
          endLine = j;
        }
        
        containerSpans.push({
          type: directiveType,
          category,
          startLine: i + 1, // 1-indexed
          endLine: endLine + 1,
          indentLevel
        });
      }
    }
    
    // Check for nested containers
    for (const inner of containerSpans) {
      for (const outer of containerSpans) {
        if (inner === outer) continue;
        
        // Check if inner starts within outer's span
        if (inner.startLine > outer.startLine && inner.startLine <= outer.endLine) {
          // Exception: Tabs CAN contain callouts and tables (they're content organizers)
          if (outer.category === 'tabs') {
            continue;
          }
          
          issues.push({
            file: filename,
            line: inner.startLine,
            rule: 'nested-component',
            severity: 'error',
            message: `${inner.type} nested inside ${outer.type} (not allowed)`,
            suggestion: 'Move the nested component outside or restructure content'
          });
          break; // Only report once per inner container
        }
      }
    }
  }
  
  return issues;
}

function checkMalformedRefs(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  
  // RST-specific check
  if (isMarkdown(filename)) return issues;
  
  const malformedRefRegex = /:ref:`?<([^>]+)>`?/g;
  let match;
  
  while ((match = malformedRefRegex.exec(content)) !== null) {
    issues.push({
      file: filename,
      line: lineNumberFromIndex(content, match.index!),
      rule: 'syntax-malformed-ref',
      severity: 'error',
      message: 'Malformed :ref: directive with angle brackets',
      current: match[0],
      suggestion: `Remove angle brackets: :ref:\`${match[1]}\``
    });
  }
  
  return issues;
}

function checkBrokenMdLinks(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  
  // MD/MDX-specific check for common link issues
  if (!isMarkdown(filename)) return issues;
  
  // Check for empty links: []() or [text]()
  const emptyLinkRegex = /\[([^\]]*)\]\(\s*\)/g;
  let match;
  
  while ((match = emptyLinkRegex.exec(content)) !== null) {
    issues.push({
      file: filename,
      line: lineNumberFromIndex(content, match.index!),
      rule: 'syntax-empty-link',
      severity: 'error',
      message: 'Empty link URL',
      current: match[0],
      suggestion: 'Add a URL inside the parentheses'
    });
  }
  
  return issues;
}

function checkLowContent(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const isMd = isMarkdown(filename);
  
  // Remove frontmatter, directives, headings for content measurement
  let contentOnly = content;
  
  if (isMd) {
    contentOnly = content
      .replace(/^---[\s\S]*?---/m, '') // Remove frontmatter
      .replace(/^#+\s+.+$/gm, '')       // Remove headings
      .replace(/<[^>]+>/g, '')          // Remove JSX/HTML tags
      .replace(/^\s*$/gm, '')
      .trim();
  } else {
    contentOnly = content
      .replace(/^\.\.\s+\w+::.*/gm, '')
      .replace(/^:\w+:.*$/gm, '')
      .replace(/^=+$/gm, '')
      .replace(/^-+$/gm, '')
      .replace(/^\s*$/gm, '')
      .trim();
  }
  
  if (contentOnly.length < 100) {
    issues.push({
      file: filename,
      line: 1,
      rule: 'seo-low-content',
      severity: 'warning',
      message: `Low content page (${contentOnly.length} characters). Consider adding noindex or expanding content.`,
      suggestion: isMd 
        ? 'Add more content or add noindex: true to frontmatter'
        : 'Add more content or add noindex directive'
    });
  }
  
  return issues;
}

// =============================================================================
// MAIN LINTING FUNCTION
// =============================================================================

/**
 * Lint content and return all issues
 */
export function lintContent(content: string, filename: string): LintIssue[] {
  const allIssues: LintIssue[] = [];

  if (isAgentToolingFile(filename)) {
    return allIssues;
  }
  
  // Include files are fragments - skip page-level SEO checks (title, meta, headings)
  const isInclude = isIncludeFile(filename);
  
  if (!isInclude) {
    allIssues.push(...checkTitle(content, filename));
    allIssues.push(...checkMetaDescription(content, filename));
    allIssues.push(...checkH1(content, filename));
    allIssues.push(...checkH2BeforeH1(content, filename));
    allIssues.push(...checkLowContent(content, filename));
  }
  
  // These checks apply to all files (including includes)
  allIssues.push(...checkImageAlt(content, filename));
  allIssues.push(...checkPngFigwidth(content, filename));
  allIssues.push(...checkSvgDimensions(content, filename));
  allIssues.push(...checkNestedComponents(content, filename));
  allIssues.push(...checkMalformedRefs(content, filename));
  allIssues.push(...checkBrokenMdLinks(content, filename));
  
  return allIssues;
}

/**
 * Format issues for terminal output
 */
export function formatIssuesForTerminal(issues: LintIssue[]): string {
  if (issues.length === 0) {
    return '✅ SEO linter passed - no issues found';
  }
  
  const lines: string[] = [];
  const errorCount = issues.filter(i => i.severity === 'error').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  
  for (const issue of issues) {
    const emoji = issue.severity === 'error' ? '🔴' : '🟡';
    lines.push(`${emoji} ${issue.file}:${issue.line}`);
    lines.push(`   [${issue.rule}] ${issue.message}`);
    if (issue.current) lines.push(`   Current: ${issue.current}`);
    lines.push(`   Fix: ${issue.suggestion}`);
    lines.push('');
  }
  
  lines.push(`Found ${errorCount} error(s), ${warningCount} warning(s)`);
  
  return lines.join('\n');
}
