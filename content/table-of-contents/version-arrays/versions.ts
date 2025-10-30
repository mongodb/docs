class Versions {
  allVersions: string[];
  deprecatedVersions: Set<string>;
  namedVersions: Map<string, string>;

  constructor(
    allVersions: string[],
    deprecatedVersions: string[],
    namedVersions: Map<string, string>,
  ) {
    this.allVersions = allVersions;
    this.deprecatedVersions = new Set(deprecatedVersions);
    this.namedVersions = namedVersions;
  }

  setDifference(s1: Set<string>, s2: Set<string>): Set<string> {
    return new Set([...s1].filter((x) => !s2.has(x)));
  }

  removeDeprecated(selectedVersions: string[]): string[] {
    const versions = new Set(selectedVersions);
    const onlyActiveVersions = this.setDifference(
      versions,
      this.deprecatedVersions,
    );
    return Array.from(onlyActiveVersions);
  }

  useNamedVersions(selectedVersions: string[]) {
    for (let i = 0; i < selectedVersions.length; i++) {
      const v = selectedVersions[i];
      if (this.namedVersions.has(v)) {
        selectedVersions[i] = this.namedVersions.get(v) as string;
      }
    }
    return selectedVersions;
  }

  clean(selectedVersions: string[]): string[] {
    selectedVersions = this.removeDeprecated(selectedVersions);
    selectedVersions = this.useNamedVersions(selectedVersions);
    if (selectedVersions.length === 0) {
      throw new Error(`TOC ERROR: Empty version array detected.`);
    }
    return selectedVersions;
  }

  before(v: string, options?: { inclusive?: boolean }): string[] {
    let i = this.allVersions.indexOf(v);
    // throw an error if the version (v) is not found in the allVersions array
    if (i === -1) {
      throw new Error(`TOC ERROR: ${v} is not a valid version.`);
    }
    if (options?.inclusive) {
      i += 1;
    }
    const versions = this.allVersions.slice(0, i);
    return this.clean(versions);
  }

  after(v: string, options?: { inclusive?: boolean }): string[] {
    let i = this.allVersions.indexOf(v);
    // throw an error if the version (v) is not found in the allVersions array
    if (i === -1) {
      throw new Error(`TOC ERROR: ${v} is not a valid version.`);
    }
    if (options?.inclusive) {
      i -= 1;
    }
    const versions = this.allVersions.slice(i + 1);
    return this.clean(versions);
  }
}

export default Versions;
