/**
 * Redirect Linter - Core Rules
 * 
 * Detects circular redirects in netlify.toml files.
 */

export interface RedirectRule {
  from: string;
  to: string;
  line: number;
  file: string;
}

export interface RedirectIssue {
  file: string;
  line: number;
  rule: string;
  message: string;
  chain: string[];
  severity: 'error' | 'warning';
}

/**
 * Normalize a path for comparison (strip trailing slashes only)
 * Note: URLs ARE case-sensitive, so we preserve case
 */
function normalizePath(path: string): string {
  let normalized = path.trim();
  // Remove trailing slash (but keep root /)
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

/**
 * Parse netlify.toml format redirects
 * 
 * Format:
 * [[redirects]]
 * from = "/old/path/"
 * to = "/new/path/"
 * status = 301  # optional, defaults to 301
 * 
 * Note: status = 200 is a "rewrite" (proxy), not a redirect - we skip those
 */
export function parseNetlifyToml(content: string, filename: string): RedirectRule[] {
  const rules: RedirectRule[] = [];
  const lines = content.split('\n');
  
  let currentFrom: string | null = null;
  let currentTo: string | null = null;
  let currentStatus: number | null = null;
  let blockStartLine = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lineNum = i + 1;
    
    // Start of a redirect block
    if (line === '[[redirects]]') {
      // Save previous block if complete and not a rewrite (status 200)
      if (currentFrom && currentTo && currentStatus !== 200) {
        rules.push({
          from: normalizePath(currentFrom),
          to: normalizePath(currentTo),
          line: blockStartLine,
          file: filename
        });
      }
      currentFrom = null;
      currentTo = null;
      currentStatus = null;
      blockStartLine = lineNum;
      continue;
    }
    
    // Parse from = "..."
    const fromMatch = line.match(/^from\s*=\s*["'](.+?)["']/);
    if (fromMatch) {
      currentFrom = fromMatch[1];
      if (!blockStartLine) blockStartLine = lineNum;
    }
    
    // Parse to = "..."
    const toMatch = line.match(/^to\s*=\s*["'](.+?)["']/);
    if (toMatch) {
      currentTo = toMatch[1];
    }
    
    // Parse status = 200/301/302/etc
    const statusMatch = line.match(/^status\s*=\s*(\d+)/);
    if (statusMatch) {
      currentStatus = parseInt(statusMatch[1], 10);
    }
  }
  
  // Don't forget the last block (if not a rewrite)
  if (currentFrom && currentTo && currentStatus !== 200) {
    rules.push({
      from: normalizePath(currentFrom),
      to: normalizePath(currentTo),
      line: blockStartLine,
      file: filename
    });
  }
  
  return rules;
}

/**
 * Parse redirects from a file (netlify.toml format only)
 */
export function parseRedirects(content: string, filename: string): RedirectRule[] {
  return parseNetlifyToml(content, filename);
}

/**
 * Find circular redirects in a set of rules
 * 
 * Detects:
 * - Direct loops: A -> A
 * - Two-step cycles: A -> B -> A
 * - Longer chains: A -> B -> C -> A
 */
export function findCircularRedirects(rules: RedirectRule[]): RedirectIssue[] {
  const issues: RedirectIssue[] = [];
  
  // Build a map of from -> to for quick lookup
  const redirectMap = new Map<string, RedirectRule>();
  for (const rule of rules) {
    redirectMap.set(rule.from, rule);
  }
  
  // Check each redirect for cycles by following the chain
  for (const rule of rules) {
    const chain: string[] = [rule.from];
    const visited = new Set<string>([rule.from]);
    let current = rule.to;
    
    while (current) {
      // Check if we've looped back to something we've already visited
      if (visited.has(current)) {
        issues.push({
          file: rule.file,
          line: rule.line,
          rule: 'circular-redirect',
          message: `Circular redirect detected`,
          chain: [...chain, current],
          severity: 'error'
        });
        break;
      }
      
      // Follow the chain
      chain.push(current);
      visited.add(current);
      
      const nextRule = redirectMap.get(current);
      if (nextRule) {
        current = nextRule.to;
      } else {
        break; // End of chain (destination doesn't redirect further)
      }
    }
  }
  
  // Deduplicate cycles (A->B->C->A, B->C->A->B, C->A->B->C are the same cycle)
  const seenCycles = new Set<string>();
  return issues.filter(issue => {
    // Create a canonical representation: sort the cycle members (excluding the repeated end)
    const cycleMembers = issue.chain.slice(0, -1);
    const cycleKey = [...cycleMembers].sort().join('|');
    if (seenCycles.has(cycleKey)) {
      return false;
    }
    seenCycles.add(cycleKey);
    return true;
  });
}

/**
 * Find self-redirects (A -> A)
 */
export function findSelfRedirects(rules: RedirectRule[]): RedirectIssue[] {
  return rules
    .filter(rule => rule.from === rule.to)
    .map(rule => ({
      file: rule.file,
      line: rule.line,
      rule: 'self-redirect',
      message: `Page redirects to itself`,
      chain: [rule.from, rule.to],
      severity: 'error'
    }));
}

/**
 * Main lint function - checks for all redirect issues
 */
export function lintRedirects(content: string, filename: string): RedirectIssue[] {
  const rules = parseRedirects(content, filename);
  const issues: RedirectIssue[] = [];
  
  // Find self-redirects first
  const selfRedirects = findSelfRedirects(rules);
  issues.push(...selfRedirects);
  
  // Find circular redirects, excluding self-redirects (already reported)
  const selfRedirectPaths = new Set(selfRedirects.map(i => i.chain[0]));
  const circularIssues = findCircularRedirects(rules).filter(
    issue => !selfRedirectPaths.has(issue.chain[0])
  );
  issues.push(...circularIssues);
  
  return issues;
}

/**
 * Lint multiple files together (to catch cross-file cycles)
 */
export function lintRedirectsMultiFile(files: Array<{content: string, filename: string}>): RedirectIssue[] {
  // Collect all rules from all files
  const allRules: RedirectRule[] = [];
  for (const file of files) {
    allRules.push(...parseRedirects(file.content, file.filename));
  }
  
  const issues: RedirectIssue[] = [];
  
  // Find self-redirects first
  const selfRedirects = findSelfRedirects(allRules);
  issues.push(...selfRedirects);
  
  // Find circular redirects, excluding self-redirects (already reported)
  const selfRedirectPaths = new Set(selfRedirects.map(i => i.chain[0]));
  const circularIssues = findCircularRedirects(allRules).filter(
    issue => !selfRedirectPaths.has(issue.chain[0])
  );
  issues.push(...circularIssues);
  
  return issues;
}

/**
 * Format issues for terminal output
 */
export function formatIssuesForTerminal(issues: RedirectIssue[]): string {
  if (issues.length === 0) {
    return '✅ No circular redirects found.';
  }
  
  const lines: string[] = [];
  
  for (const issue of issues) {
    const icon = issue.severity === 'error' ? '🔴' : '🟡';
    lines.push(`${icon} ${issue.file}:${issue.line}`);
    lines.push(`   [${issue.rule}] ${issue.message}`);
    lines.push(`   Chain: ${issue.chain.join(' → ')}`);
    lines.push('');
  }
  
  return lines.join('\n');
}
