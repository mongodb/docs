import { existsSync, readdirSync, statSync } from 'fs';
import { basename, join, resolve } from 'path';

export type ExpansionMap = Record<string, string>;

const TEMPLATE_MARKER = /\{\+([A-Za-z0-9_.-]+)\+\}|\|([A-Za-z0-9_.-]+)\|/g;
const URL_PATTERN = /https?:\/\/[^\s<>"'`]+/g;
const UNRESOLVED_MARKER = /\{\+[A-Za-z0-9_.-]+\+\}|\|[A-Za-z0-9_.-]+\||%7B\+[A-Za-z0-9_.-]+\+%7D/i;
const DOC_EXTENSIONS = new Set(['.rst', '.txt', '.md', '.mdx']);

export function expandTemplateMarkers(content: string, values: ExpansionMap): string {
  function expand(text: string, stack: string[]): string {
    const markerPattern = new RegExp(TEMPLATE_MARKER.source, 'g');
    return text.replace(markerPattern, (marker, constantName: string, substitutionName: string) => {
      const name = constantName ?? substitutionName;
      const value = values[name];
      if (value === undefined || stack.includes(name)) {
        return marker;
      }
      return expand(value, [...stack, name]);
    });
  }

  return expand(content, []);
}

export function removeUnexpandedTemplateUrls(content: string): {
  content: string;
  urls: string[];
} {
  const urls: string[] = [];
  const stripped = content.replace(URL_PATTERN, url => {
    if (!UNRESOLVED_MARKER.test(url)) {
      return url;
    }
    urls.push(url);
    return '';
  });
  return { content: stripped, urls };
}

export function findSnootyToml(filePath: string): string | undefined {
  let directory = resolve(filePath);
  try {
    if (!statSync(directory).isDirectory()) {
      directory = resolve(directory, '..');
    }
  } catch {
    directory = resolve(directory, '..');
  }

  while (true) {
    const candidate = join(directory, 'snooty.toml');
    try {
      if (statSync(candidate).isFile()) {
        return candidate;
      }
    } catch {
      // Continue walking toward the repository root.
    }

    const parent = resolve(directory, '..');
    if (parent === directory) {
      return undefined;
    }
    directory = parent;
  }
}

export function listSourceDocFiles(snootyTomlPath: string): string[] {
  const sourceDirectory = join(resolve(snootyTomlPath, '..'), 'source');
  const files: string[] = [];

  function visit(directory: string): void {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const entryPath = join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(entryPath);
      } else if (entry.isFile() && DOC_EXTENSIONS.has(entry.name.slice(entry.name.lastIndexOf('.')))) {
        files.push(entryPath);
      }
    }
  }

  if (!existsSync(sourceDirectory)) {
    return [];
  }
  visit(sourceDirectory);
  return files;
}

export function expandSnootyTomlInputs(filePaths: string[]): string[] {
  const expanded = filePaths.flatMap(filePath => {
    if (basename(filePath) !== 'snooty.toml') {
      return [filePath];
    }
    return listSourceDocFiles(filePath);
  });
  return [...new Set(expanded)];
}
